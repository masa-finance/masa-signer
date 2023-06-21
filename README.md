# Masa Signer

## Configuration

`cp .env.dist .env`

Change `Address` and `Private Key` in `.env` to according to your env.

PRIVATE_KEY=  
ADDRESS=

## Running the signer with Docker

Build:  
`docker build . -t masa-signer`

Run:

```shell
docker run -it -p 4000:4000 --env-file ./.env masa-signer

Express app listening at 'http://0.0.0.0:4000'
```

## Using it with the cli

Config:

```shell
masa settings set api-url http://localhost:4000
```

Login with the cli:

```shell
masa login --verbose

Masa CLI running with verbose output!

Logging in
Getting '/session/check'
{
  {
    getChallengeResponse: {
    status: 200,
    getChallengeResponseData: {
    challenge: '8hK4GuVsFrkULhb16EnrnOoK2cK87Q1P',
    expires: 'Fri, 21 Jul 2023 10:41:38 GMT'
    },
    cookie: 'my_fancy_session_name=s%3AkxvYzLCheuUqH6Cz8jwV3QAignKMdn1t.4PEdKI3ZDJpr7gKfH92cwe%2FdlTmF0emwt2vhLodjW%2BA; Domain=localhost; Path=/; Expires=Fri, 21 Jul 2023 10:41:38 GMT; SameSite=Lax'
  }
}

```

Sign:

```shell
curl --location 'http://localhost:4000/sbt/sign' \
  --header 'Cookie: my_fancy_session_name=s%3AkxvYzLCheuUqH6Cz8jwV3QAignKMdn1t.4PEdKI3ZDJpr7gKfH92cwe%2FdlTmF0emwt2vhLodjW%2BA; Domain=localhost; Path=/; Expires=Fri, 21 Jul 2023 10:41:38 GMT; SameSite=Lax' \
  --header 'Content-Type: application/json' \
  --data '{
    "network": "goerli"
}'

{
  "contractAddress":"0x1fCE0Ae50a8900f09E4A437F33E95313225Bb4b7",
  "authorityAddress":"0x3c8D9f130970358b7E8cbc1DbD0a1EbA6EBE368F",
  "signatureDate":1687344282503,
  "signature":"0xbb74a5c7c47a62888168d24b4487e5cd44415a7944cfeedfaba946151319e80e628676bb3d6d67f04fc5b4740392f7a9a350be2a4625f3de1fa4985ad4af13fd1c"
}
```

Now the owner of the address that was used to login is allowed to mint the SBT using the SSSBT mint operation.
