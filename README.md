<p align="center">
  <a href="https://www.rosetta-api.org">
    <img width="90%" alt="Rosetta" src="https://www.rosetta-api.org/img/rosetta_header.png">
  </a>
</p>
<h3 align="center">
   Rosetta Explorer
</h3>
<p align="center">
Experimental Blockchain explorer that can connect to multiple Rosetta Nodes (IN PROGRESS).
</p>

[![Build](https://github.com/fboucquez/rosetta-explorer/actions/workflows/build.yml/badge.svg)](https://github.com/fboucquez/rosetta-explorer/actions/workflows/build.yml)

## Overview

The Rosetta Explorer is a front-end application navigates different blockchains using the [Rosetta API](https://www.rosetta-api.org/).

It has been implemented using the [Next.js](https://nextjs.org/) project and bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

This first version has been tested against a local [Rosetta Ethereum](https://github.com/coinbase/rosetta-ethereum) node.

Run the Ethereum Mainnet node using the docker image:

```bash
bash run-rosetta-ethereum.sh 
```
The node will take quite a while to be fully up-to-date. While syncing, you can still run, play and improve the explorer.

Run the Explorer development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Connect to different nodes

You can connect to multiple different nodes by providing the Rosetta Server Rest APIs.

Create a `.env.local` file with a CSV of your nodes:

```
NEXT_PUBLIC_NETWORKS=Ethereum=http://my.rosetta.eth.node:8080,Bitcoin=http://my.rosetta.btc.node:8080,Solana=http://my.rosetta.sol.node:8080
```

Given that interesting data is found in the network's specific `metadata` fields, some custom behaviour is required.
The `NetworkManager` and `NetworkHandle` hierarchy should handle that. The network handler needs to be extended accordingly. 


