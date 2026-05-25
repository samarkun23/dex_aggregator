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
1. Clone the repository : `git clone https://github.com/samarkun23/dex_aggregator.git`
2. Install dependencies: `npm install`
3. Run the project locally: `npm run dev`

## 🧠 Why this project is special
DexFlow acts as a mini Uniswap aggregator engine:

- Finds liquidity across DEXs
- Optimizes trade output
- Reduces slippage loss
- Gives better execution price automatically

## Future Improvements in details
Based on the current state of AeroDex, you've built a solid foundation for a DEX aggregator. It currently handles multi-DEX price discovery and execution for direct pairs. 

  To take this from a "mini-aggregator" to a professional-grade DeFi tool, here are several high-impact features and improvements you can add:

  1. 🔀 Multi-Hop Smart Routing (Backend Logic)
  The Problem: Currently, you only check direct paths (e.g., Token A -> Token B). If there's no direct liquidity pool for that pair, your app will fail to find a quote.
  The Improvement: Implement a search for intermediate tokens.
   * Check paths like [Token A, WETH, Token B] or [Token A, USDC, Token B].
   * Most professional aggregators check 2-3 "hops" to find the best price, especially for smaller altcoins.

  2. 📊 Dynamic & Accurate Charting
  The Problem: Your api/charts/route.ts is currently hardcoded to a single WETH/USDC pool.
  The Improvement: 
   * Update the API to take tokenIn and tokenOut as parameters.
   * Use the GeckoTerminal API or DexScreener API to fetch the OHLCV data for the specific pair the user has selected in the Swap Widget.
   * Add a "Price Impact" indicator: Show the user how much their specific trade size will move the market price (e.g., "Price Impact: 0.05%").

  3. ⚙️ Advanced Trade Settings (Slippage & Gas)
  The Problem: Slippage is fixed at 1% in Trade.tsx, and gas isn't estimated for the user beforehand.
  The Improvement:
   * User-Defined Slippage: Add a settings gear icon to let users set their own slippage (0.1%, 0.5%, 1%, or Custom).
   * Gas Estimation: Use ethers' estimateGas function before the trade. Show the user the estimated fee in USD: "Estimated Gas Fee: $4.20".
   * Infinite Approval Toggle: Allow users to approve a "max" amount once so they don't have to pay for an approve() transaction every single time they swap that token.

  4. 💼 Portfolio & Wallet Insights
  The Problem: The user can't see what they already own.
  The Improvement:
   * Add a "Balance" display next to the token selection. 
   * Create a "Your Assets" sidebar that lists the user's balances for all tokens in your tokenList.json.
   * Add a "Max" button to the input field that automatically fills in the user's entire balance.

  5. 📜 Transaction History (Local)
  The Problem: Once a trade is done, the record disappears.
  The Improvement:
   * Store successful transactions in localStorage.
   * Show a "Recent Transactions" list in the UI with links to Etherscan so users can track their trading history.

  6. 🌐 Multi-Chain Support
  The Problem: DeFi is moving toward Layer 2s (Arbitrum, Base, Polygon).
  The Improvement:
   * Add a Network Selector (Ethereum, Base, Arbitrum).
   * Update your blockchain.json to include router addresses for these networks (e.g., Aerodrome on Base, Uniswap V3 on Arbitrum).

  7. 🎨 UI/UX Polish
   * Token Search: Add a search bar inside the token selector modal.
   * Auto-Refresh: Refresh the price quotes every 15 seconds automatically so the "Best Price" is always current.
   * Loading States: Add "Skeleton" loaders while the app is fetching quotes from multiple DEXs to make the app feel faster.

## ⚠️ Disclaimer
This project is built for educational & experimental DeFi development purposes only.

## Badges
![Next.js](https://img.shields.io/badge/Next.js-black)
![Ethers](https://img.shields.io/badge/Ethers.js-blue)
![Web3](https://img.shields.io/badge/Web3-DeFi-green)