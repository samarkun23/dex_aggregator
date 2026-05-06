import WalletButtons, { ConnectButton } from "@/app/components/ConnectButton";
import CogIcon from "./CogIcon";
import SwapIcon from "./SwapIcon";
import { useState } from "react";
import { Dex } from "@/app/page";
import { Contract, formatUnits } from "ethers";
import blockchain from '../app/blockchain.json'
import { Trade } from "@/app/components/Trade";
import { parseUnits } from "ethers";

export const SwapWidget = ({ setSigner, dexes, signer, setTrade, setToken, trade }: { setSigner: any, dexes: Dex[], signer: any, setTrade: any, setToken: any, trade: any }) => {
  const [tokenIn, setTokenIn] = useState("");
  const [tokenOut, setTokenOut] = useState("");
  const [amountIn, setAmountIn] = useState("");
  
  const search = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const tokenInContract = new Contract(tokenIn, blockchain.erc20Abi, signer);
    const tokenOutContract = new Contract(tokenOut, blockchain.erc20Abi, signer);
    const [decimalsIn, decimalsOut] = await Promise.all([tokenInContract.decimals(), tokenOutContract.decimals()]);
    // now we itrate all the dexes and call this function 
    // How ? We are going to create a array of promises and then we're going to do all these calls together otherwise if we wait for each of these call to be finished means if we don't do them congruently then if we have many calls to do then we screwed.
    
    const validDexes = dexes.filter(dex => dex.contract);
    
    // parse the amount in to the correct decimals
    const tokenContract = new Contract(tokenIn, blockchain.erc20Abi, signer);
    const decimals = await tokenContract.decimals();
    const ParsedAmountIn = parseUnits(amountIn, decimals);
    
    const calls = validDexes.map(async (dex: any) => {
      try {
        const q = await dex.contract?.getAmountsOut(
          ParsedAmountIn,
          [tokenIn, tokenOut]
        )
        return {q, dex};
      } catch (error) {
        return null;
      }
    });

    console.log("CALLS", calls);

    const quotes = await Promise.all(calls); // this lauch all of those calls and when everthing finish we got array of array but we only care 1 element of each array
    console.log("QUOTES", quotes);

    // PROBLEM : If we short this array like this but we don't know which is which bec there is just a number so now we know the order when we call the dex.contract but in quotes we don't know what is what so we need to atach some more info to be able to indentify each element .
    const validQuotes = quotes.filter((quote): quote is { q: any, dex: any } => quote !== null);

    console.log("VALID QUOTES", validQuotes);
    // filter a valid quotes that are not null
    const trades = validQuotes.map(({ q, dex }) => (
      {
        address: dex.address,
        // @ts-ignore
        amountIn: q[0],
        amountOut: q[q.length - 1],
        tokenIn,
        tokenOut
      }
    ));

    // now we short those trades and just take the best one 
    trades.sort((trade1, trade2) => (
      trade1.amountOut < trade2.amountOut ? -1 : 1
    ));

    setTrade(
      {
        ...trades[0],
        meta:{
          decimalsIn,
          decimalsOut
        }
      }
    );
  }

  const dex = dexes.find(dex => dex.address === trade?.address);

  return (
    <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl relative overflow-hidden group">
      {/* need to implement this swap function  */}
      <form onSubmit={search}>

        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/6 to-transparent pointer-events-none"></div>

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-white font-bold text-lg">Swap</h3>
          <button className="text-zinc-500 hover:text-white transition-colors"><CogIcon /></button>
        </div>

        <div className="space-y-2">
          {/* Pay Section */}
          <div className="bg-zinc-950/60 p-4 rounded-xl border border-white/5 group-hover:border-white/10 transition-colors">
            <div className="flex justify-between text-[10px] uppercase tracking-wider text-zinc-500 mb-3 font-bold">
              <span>You Pay</span>
              <span>Balance: 1.24 ETH</span>
            </div>
            <div className="flex justify-between items-center">
              <input
                id="tokenIn"
                type="text"
                placeholder="0.0"
                className="bg-transparent text-3xl text-white outline-none w-full font-mono placeholder:text-zinc-800"
                onChange={e => setTokenIn(e.target.value)}
                value={tokenIn}
              />
              <div className="bg-zinc-800 px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer border border-white/5 hover:bg-zinc-700 transition-all">
                <div className="w-5 h-5 bg-yellow-500/20 rounded-full flex items-center justify-center text-[10px] text-yellow-500">Ξ</div>
                <span className="text-white font-bold text-sm">ETH</span>
                <svg className="w-3 h-3 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          {/* Switch Button */}
          <div className="flex justify-center -my-4 relative z-10">
            <button className="bg-zinc-900 border border-white/10 p-2.5 rounded-xl text-cyan-400 hover:text-cyan-300 hover:scale-110 transition-all shadow-xl">
              <SwapIcon />
            </button>
          </div>

          {/* Receive Section */}
          <div className="bg-zinc-950/60 p-4 rounded-xl border border-white/5 group-hover:border-white/10 transition-colors">
            <div className="flex justify-between text-[10px] uppercase tracking-wider text-zinc-500 mb-3 font-bold">
              <span>You Receive</span>
              <span>Balance: 0.00</span>
            </div>
            <div className="flex justify-between items-center">
              <input
                id="tokenOut"
                type="text"
                placeholder="0.0"
                className="bg-transparent text-3xl text-white outline-none w-full font-mono placeholder:text-zinc-800"
                onChange={e => setTokenOut(e.target.value)}
                value={tokenOut}
              />
              <div className="bg-cyan-400 px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                <div className="w-5 h-5 bg-black/20 rounded-full flex items-center justify-center text-[10px] text-black">$</div>
                <span className="text-black font-bold text-sm">USDC</span>
                <svg className="w-3 h-3 text-black/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
          {/* Amount section  */}
          <div className="bg-zinc-950/60 p-4 rounded-xl border border-white/5 group-hover:border-white/10 transition-colors">
            <div className="flex justify-between text-[10px] uppercase tracking-wider text-zinc-500 mb-3 font-bold">
              <span>AMOUNT</span>
            </div>
            <div className="flex justify-between items-center">
              <input
                id="tokenOut"
                type="text"
                placeholder="0.0"
                className="bg-transparent text-3xl text-white outline-none w-full font-mono placeholder:text-zinc-800"
                onChange={e => setAmountIn(e.target.value)}
                value={amountIn}
              />
            </div>
          </div>

        </div>


        {/* Transaction Details */}
        {signer && (
        <div className="mt-6 space-y-3 px-1">
          <div className="flex justify-between text-[11px]">
            <span className="text-zinc-200 text-[13px]">Exchange </span>
            <span className="text-zinc-300 font-mono">
              {dex ? dex.name : "Loading..."} 
            </span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-zinc-200 text-[13px]">Amount token sold</span>
            <span className="text-green-400 font-bold">
              {trade ? formatUnits(trade.amountIn, trade.meta.decimalsIn) : "Loading..."}
            </span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-zinc-200 text-[13px]">Amount token bought</span>
            <span className="text-green-400 font-bold">
              {trade ? formatUnits(trade.amountOut, trade.meta.decimalsOut) : "Loading..."}
            </span>
          </div>
        </div>
        )}

        {!signer ? (
          <>
            <WalletButtons miniButton={false} setSigner={setSigner} />
          </>
        ): (
          <>
            {trade && <Trade trade={trade} />}  
            <button className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-black py-4 rounded-xl mt-8 transition-all shadow-[0_0_30px_rgba(34,211,238,0.25)] active:scale-[0.98] uppercase tracking-wider" type="submit">SUBMIT</button>
          </>
        )}

      </form>
    </div>
  )
};

export const FeatureCard = ({ icon, title, description, metric, accentColor }: {
  icon: any,
  title: any,
  description: any,
  metric: any,
  accentColor: any
}) => (
  <div className="p-8 bg-zinc-900/20 border border-white/5 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-all duration-500">
    <div className={`absolute top-0 left-0 w-1 h-full ${accentColor} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
    <div className="text-3xl mb-6 filter grayscale group-hover:grayscale-0 transition-all">{icon}</div>
    <h4 className="text-xl font-bold text-white mb-4 tracking-tight">{title}</h4>
    <p className="text-zinc-500 text-sm leading-relaxed mb-12 group-hover:text-zinc-400 transition-colors">{description}</p>
    <div className={`text-[10px] font-black uppercase tracking-[0.2em] ${accentColor.replace('bg-', 'text-')}`}>{metric}</div>
  </div>
);

