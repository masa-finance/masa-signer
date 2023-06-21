<!-- TOC -->
  * [Setup](#setup)
  * [Usage with the Masa CLI](#usage-with-the-masa-cli)
<!-- TOC -->

## Setup

```shell
$ yarn
$ yarn start

yarn run v1.22.19
$ nodemon ./src/server.ts
[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: ts,json
[nodemon] starting `ts-node ./src/server.ts`
Express app listening at 'http://localhost:4000'
```

## Usage with the Masa CLI

```shell
$ masa settings set api-url http://localhost:4000/
  __  __                            ____   _       ___
 |  \/  |   __ _   ___    __ _     / ___| | |     |_ _|
 | |\/| |  / _` | / __|  / _` |   | |     | |      | |
 | |  | | | (_| | \__ \ | (_| |   | |___  | |___   | |
 |_|  |_|  \__,_| |___/  \__,_|    \____| |_____| |___|

Key 'api-url' successfully set!
```

```shell
$ masa login
  __  __                            ____   _       ___
 |  \/  |   __ _   ___    __ _     / ___| | |     |_ _|
 | |\/| |  / _` | / __|  / _` |   | |     | |      | |
 | |  | | | (_| | \__ \ | (_| |   | |___  | |___   | |
 |_|  |_|  \__,_| |___/  \__,_|    \____| |_____| |___|

Logging in
Signing:
'Welcome to 🌽Masa Finance!

Login with your soulbound web3 identity to unleash the power of DeFi.

Your signature is valid till: Thu, 18 May 2023 10:00:11 GMT.
Challenge: uxOJz9en7y6tWoaqC9wWJpmSab6ALcxA'

Signature: '0x3ad1a93d68f3abffc841a768d0ed3df9f5335c0cab0263e7d9d944473b5c813402c75c0944534ebe3a40edd20a88c715332c4564e1ff4f65fbdb68a8641d48df1b'

Logged in as:
Address: '0x8ba2D360323e3cA85b94c6F7720B70aAc8D37a7a'
```

service side:

```shell
Express app listening at 'http://localhost:4000'
has challenge undefined
Session: {
  "cookie": {
    "originalMaxAge": 2592000000,
    "expires": "2023-05-18T10:00:11.834Z",
    "secure": false,
    "httpOnly": false,
    "domain": "localhost",
    "path": "/",
    "sameSite": "lax"
  }
} has no challenge, rejected!
generated challenge! uxOJz9en7y6tWoaqC9wWJpmSab6ALcxA
has challenge uxOJz9en7y6tWoaqC9wWJpmSab6ALcxA
```