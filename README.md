# ⚡ AeroDex — Multi-DEX Swap Aggregator
A decentralized swap aggregator that finds the best token prices across multiple DEXs and executes optimized trades with gas estimation and slippage protection.

## ✨ Features
- 🔁 Multi-DEX token swapping
- 📊 Real-time price comparison (best route selection)
- ⚡ Gas estimation before transaction
- 🧠 Smart trade routing engine
- 🔐 Wallet connection (MetaMask/Web3)
- 🔄 Dynamic token list system
- 📉 Slippage protection mechanism
- ⚙️ Fully on-chain execution logic

## 🧠 How It Works
1. User selects tokens
2. App queries multiple DEX contracts
3. Fetches swap quotes using `getAmountsOut`
4. Selects best output trade
5. Estimates gas cost
6. Approves ERC20 spending
7. Executes swap transaction

## 🔄 Architecture

Frontend (Next.js + React)
        
        ↓

Ethers.js (Blockchain Layer)

        ↓

Multiple DEX Contracts

        ↓

On-chain Swap Execution

## 🛠 Tech Stack
- Next.js 14
- React
- Ethers.js v6
- Tailwind CSS
- Solidity (DEX interaction)
- Web3 Wallets (MetaMask)

## 📁 Project Structure
```
/app
  /components
    Trade.tsx
    ConnectButton.tsx
  blockchain.json
  tokenList.json
/components
    AeroDexLanding.tsx
    CogIcon.tsx
    Navbar.tsx
    SwapIcon.tsx
    SwapWidget.tsx
```

## ⚠️ Important Notes
- Always verify ABI before swap execution
- Token approval required before trading
- Gas estimation may vary based on network congestion
- Slippage is applied automatically during trade execution

## 🚀 Future Improvements
- 🔀 Multi-hop routing (A → B → C swaps)
- 📊 Price impact visualization
- 🌐 Add more DEX integrations
- 📜 Transaction history tracking
- 📱 Mobile-first UI optimization
- 📡 Live price streaming (WebSockets)

## 🧑‍💻 Setup
1. Clone the repository : `git clone https://github.com/aerodex/aerodex.git`
2. Install dependencies: `npm install`
3. Run the project locally: `npm run dev`

## 🧠 Why this project is special
DexFlow acts as a mini Uniswap aggregator engine:

- Finds liquidity across DEXs
- Optimizes trade output
- Reduces slippage loss
- Gives better execution price automatically

## ⚠️ Disclaimer
This project is built for educational & experimental DeFi development purposes only.

## Badges
![Next.js](https://img.shields.io/badge/Next.js-black)
![Ethers](https://img.shields.io/badge/Ethers.js-blue)
![Web3](https://img.shields.io/badge/Web3-DeFi-green)