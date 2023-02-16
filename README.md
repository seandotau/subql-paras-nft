# SubQuery Paras NFT

This project indexes NFTs from https://paras.id/. It specifically indexes actions where the receiver is marketplace.paras.near on the buy method. In otherwords, NFTs that have been bought in the Paras marketplace. 

## Preparation

#### Environment

- [Typescript](https://www.typescriptlang.org/) are required to compile project and define types.

- Both SubQuery CLI and generated Project have dependencies and require [Node](https://nodejs.org/en/).

#### Install the SubQuery CLI

Install SubQuery CLI globally on your terminal by using NPM:

```
npm install -g @subql/cli
```

Run help to see available commands and usage provide by CLI

```
subql help
```

## Clone project


```
git clone https://github.com/seandotau/subql-paras-nft.git
```

In the project directory, install all the dependencies.

```
yarn install
```

## Customise project

To customise this project, 3 files will be required to be modified.

- The GraphQL Schema in `schema.graphql`
- The Manifest in `project.yaml`
- The Mapping functions in `src/mappings/` directory

For more information on how to write the SubQuery,
check out our doc section on [Building a SubQuery](https://academy.subquery.network/build/introduction.html)

## Code generation

In order to index your SubQuery project, first run codegen. This auto-generates the associated typescripts from your schema file.

```
yarn codegen
```

## Build the project

Next, build the project.

```
yarn build
```

## Indexing and Query

#### Docker

In the project directory, start docker.

```
yarn start:docker
```

#### Query the project

Open your browser and head to `http://localhost:3000` and run the following query:

```graphql
query {
  nearTxEntities(filter:{
    block:{equalTo:85291528}
  }) {
    totalCount
    nodes {
      id
      block
      receiver
    }
  }
  nearActionEntities(filter:{
    block:{equalTo:85291528}
  }) {
    totalCount
    nodes {
      id
      block
      receiver
      sender
      tokenId
      nftContractId
      ftTokenId
      price
    }
  }
}
```

Expected results

```graphql
{
  "data": {
    "nearTxEntities": {
      "totalCount": 1,
      "nodes": [
        {
          "id": "5KPsgj562k2oEA9vRCrSefYeC7TVghRg4zzdteWbzuLk-9N4vvrwppR1Rz2AoBZUAzEhZ2SfpqXGQXBCc1Lpo9sUN",
          "block": 85291528,
          "receiver": "marketplace.paras.near"
        }
      ]
    },
    "nearActionEntities": {
      "totalCount": 1,
      "nodes": [
        {
          "id": "9N4vvrwppR1Rz2AoBZUAzEhZ2SfpqXGQXBCc1Lpo9sUN-0",
          "block": 85291528,
          "receiver": "marketplace.paras.near",
          "sender": "donkey2020.near",
          "tokenId": "193",
          "nftContractId": "nft.classykangaroosv2.near",
          "ftTokenId": "near",
          "price": "45000000000000000000000000"
        }
      ]
    }
  }
}
```
