# Crypto News

Crypto News is a website with the lastest cryptocurrencies news. Build with React, Apollo, Express, Graphql and PostgreSQL.

## Demo

[https://crypto-news.gonnzalo.now.sh/](https://crypto-news.gonnzalo.now.sh/)

## Features

- Lastest cryptocurrencies news feed from different sources
- Users can add likes and comment to their favourites news
- Displays top ten cryptocurrencies price and 24hs price change.
- Full responsive

## Installation

> This guide assumes you already have [Node.js](https://nodejs.org/en/) and [Postgres](https://www.postgresql.org/) installed.

To run the website locally in the development mode please follows this guide:

1- Clone the repository and install the node modules:

```shell
git clone https://github.com/gonnzalo/crypto-news
cd crypto-news/
git install && cd server/ git install
```

2- Inside the `./server/` folder Create a `.env` file pass on these env variables:

```shell
DATABASE=example
DATABASE_USER=example
DATABASE_PASSWORD=example

SECRET=example
```

3- to start please run on the main folder

```shell
npm run start:dev
```

4- Open `http://localhost:3000` to view it in the browser.

## Test

To test the server on the `./server/` folder run:

```shell
npm run test-server
```

and them also inside `./server/` in a new terminal tab run:

```shell
npm run test
```

you can also view the graphql queries, mutations and subcriptions on the graphql playground in [here](https://crypto-news-server.herokuapp.com/graphql)

## Sources

- [CryptoCompare min-api](https://min-api.cryptocompare.com/): This API is using to get all the news feed.
- [CoinGecko API](https://www.coingecko.com/en/api): this API is used to get the top 10 cryptocurrencies price data.

## Contributing

Contributions, issues and feature requests are welcome.

## Author

- [gonnzalo](https://)

## License

[MIT](https://choosealicense.com/licenses/mit/)
