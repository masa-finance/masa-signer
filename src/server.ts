// @ts-ignore
import express, {
  Express,
  Request,
  RequestHandler,
  Response,
  Router,
} from "express";
import {
  MasaSessionMiddleware,
  MasaSessionRouter,
  sessionCheckHandler,
} from "@masa-finance/masa-express";
import type { NetworkName } from "@masa-finance/masa-sdk";
import { Masa, SupportedNetworks } from "@masa-finance/masa-sdk";
import { providers, Wallet } from "ethers";
// @ts-ignore
import cors from "cors";

const app: Express = express();

app.use(express.json());

// your session name
const sessionName = "my_fancy_session_name";
// never give this to someone!
const secret = "top_secret_1337";
// 30 days session expiration time
const ttl = 30 * 24 * 60 * 60;
// production, dev or undefined (will fall back to dev then)
const environment = "dev";
// the domain your session should be valid on
const domain = ".vitalik.org";
// custom namespace generated using: https://www.uuidtools.com/generate/v4
const sessionNamespace = "01bbc88d-3cd2-465f-8687-e0ea5e8b1231";

console.log({
  env: process.env,
  sessionName,
  secret,
  ttl,
  environment,
  domain,
  sessionNamespace,
});

const sessionMiddleware: RequestHandler = MasaSessionMiddleware({
  sessionName,
  secret,
  domain,
  ttl,
  environment,
});

app.use(
  cors({
    origin: domain,
    credentials: true,
  })
);

// session related
app.use(
  "/session",
  MasaSessionRouter({
    sessionMiddleware,
    sessionName,
    sessionNamespace,
  })
);

export const soulNameRouter: Router = express.Router();

soulNameRouter.use(sessionMiddleware);
soulNameRouter.use(sessionCheckHandler as never);

const signSBT = async (request: Express.RequestSession, response: Response) => {
  const networkName = request.body.network as NetworkName;

  const network = SupportedNetworks[networkName];

  if (!network) return;

  const provider = new providers.JsonRpcProvider(network.rpcUrls[0]);
  const wallet = new Wallet(process.env.PRIVATE_KEY as string, provider);

  console.log(`Address: ${await wallet.getAddress()}`);

  const masa = new Masa({
    signer: wallet,
    networkName,
  });

  const contractAddress = process.env.ADDRESS as string;
  const { sign } = await masa.sssbt.connect(contractAddress);

  if (sign) {
    const signResult = await sign(request.session.user.address);
    if (signResult) {
      const result = {
        contractAddress,
        ...signResult,
      };
      console.log(result);
      response.json(result);
    }
  }
};

soulNameRouter.post("/sign", signSBT as never);

app.use("/sbt", soulNameRouter);

const port = process.env.PORT || 4000; // use whatever port you need

app.listen(port, () => {
  console.log(`Express app listening at 'http://0.0.0.0:${port}'`);
});
