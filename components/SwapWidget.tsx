import WalletButtons, { ConnectButton } from "@/app/components/ConnectButton";
import CogIcon from "./CogIcon";
import SwapIcon from "./SwapIcon";
import { useState } from "react";
import { Dex } from "@/app/page";
import { Contract, formatUnits } from "ethers";
import blockchain from '../app/blockchain.json'
import { Trade } from "@/app/components/Trade";
import { parseUnits } from "ethers";
import tokenList from '../app/tokenList.json'

export const SwapWidget = ({ setSigner, dexes, signer, setTrade, setToken, trade, token }: { setSigner: any, dexes: Dex[], signer: any, setTrade: any, setToken: any, trade: any, token: any }) => {
  const [tokenIn, setTokenIn] = useState(tokenList[0].address);
  const [tokenOut, setTokenOut] = useState(tokenList[1].address);
  const [amountIn, setAmountIn] = useState("");
  const [openTokenSelector, setOpenTokenSelector] = useState(false);
  const [selectingFor, setSelectingFor] = useState("");

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
        return { q, dex };
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
        meta: {
          decimalsIn,
          decimalsOut
        }
      }
    );
  }

  const dex = dexes.find(dex => dex.address === trade?.address);

  return (
    <div className="flex flex-col h-full font-['IBM_Plex_Mono']">
      {/* header  */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e2d3d]">
        <div className="flex gap-0">
          <button className="text-[10px] font-bold bg-[#00e5ff] text-black px-4 py-1.5 tracking-widest border border-[#00e5ff]">SWAP</button>
          <button className="text-[10px] text-[#4a6080] px-4 py-1.5 tracking-widest border border-[#1e2d3d] hover:text-white transition-colors">LIMIT</button>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00e676] shadow-[0_0_6px_#00e676]" />
          <span className="text-[9px] text-[#4a6080] tracking-widest">MAINNET</span>
          <button className="text-[#4a6080] hover:text-white transition-colors"><CogIcon /></button>
        </div>
      </div>

      {/* need to implement this swap function  */}
      <form onSubmit={search} className="flex flex-col gap-0 p-4">

        <div className="bg-[#131920] border border-[#1e2d3d] p-3.5 hover:border-[#243040] transition-colors">
          <div className="flex justify-between text-[9px] uppercase tracking-widest text-[#4a6080] mb-2 font-semibold">
            <span>You Pay</span>
            <span>Bal: <span className="text-zinc-300">{amountIn || "0.00"}</span></span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <input
              type="text" placeholder="0.0" value={amountIn}
              onChange={e => setAmountIn(e.target.value)}
              className="bg-transparent text-2xl text-white outline-none w-full font-mono placeholder:text-[#2a3a50]"
            />
            <button type="button"
              onClick={() => { setSelectingFor('in'); setOpenTokenSelector(true); }}
              className="flex items-center gap-1.5 bg-[#1a2230] border border-[#243040] px-2.5 py-1.5 hover:border-[#00e5ff] transition-colors min-w-[88px] justify-between"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-gradient-to-br from-[#627EEA] to-[#8B5CF6] flex items-center justify-center text-[8px] text-white font-bold">Ξ</span>
                <span className="text-xs font-bold text-white">WETH</span>
              </span>
              <svg className="w-2.5 h-2.5 text-[#4a6080]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className="text-[10px] text-[#4a6080] mt-1.5">
              ≈ ${amountIn ? (parseFloat(amountIn) * 2847.5).toFixed(2) : '0.00'}
            </div>

          </div>

        </div>

        {/* swap icon  */}
        <div className="flex justify-center relative z-10 -my-px">
          <button type="button" className="bg-[#0d1117] border border-[#1e2d3d] text-[#00e5ff] w-7 h-7 flex items-center justify-center hover:bg-[#131920] hover:border-[#00e5ff] transition-all">
            <SwapIcon />
          </button>
        </div>

        {/* Receive box  */}
        <div className="bg-[#131920] border border-[#1e2d3d] p-3.5 hover:border-[#243040] transition-colors">
          <div className="flex justify-between text-[9px] uppercase tracking-widest text-[#4a6080] mb-2 font-semibold">
            <span>You Receive</span>
            <span>Bal: <span className="text-zinc-300">0.00 USDC</span></span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="text-2xl font-mono text-[#00e676]">
              {trade ? Number(formatUnits(trade.amountOut, trade.meta.decimalsOut)).toFixed(6) + ".." : '0.00'}
            </div>
            <button type="button"
              onClick={() => { setSelectingFor('out'); setOpenTokenSelector(true); }}
              className="flex items-center gap-1.5 bg-[rgba(0,229,255,0.08)] border border-[rgba(0,229,255,0.2)] px-2.5 py-1.5 hover:border-[#00e5ff] transition-colors min-w-[88px] justify-between"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#2775CA] flex items-center justify-center text-[8px] text-white font-bold">$</span>
                <span className="text-xs font-bold text-[#00e5ff]">USDC</span>
              </span>
              <svg className="w-2.5 h-2.5 text-[#00e5ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>
        </div>

        {/* trade details */}

        {
          signer && (
            <div className="mt-3 border border-[#1e2d3d] p-3 bg-[#131920] space-y-2">
              <div className="flex justify-between pb-2 border-b border-[#1e2d3d]">
                <span className="text-[9px] text-[#4a6080] tracking-widest">Exchange</span>
                <span className="text-[9px] text-white">
                  {dex ? dex.name : "-"} <span className="text-[#00e676]">✓ BEST</span>
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#1e2d3d]">
                <span className="text-[9px] text-[#4a6080] tracking-widest">Amount token sold</span>
                <span className="text-[#00e676] font-bold">
                  {trade ? formatUnits(trade.amountIn, trade.meta.decimalsIn) : "--"}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#1e2d3d]">
                <span className="text-[9px] text-[#4a6080] tracking-widest">Amount token bought</span>
                <span className="text-[#00e676] font-bold">
                  {trade ? formatUnits(trade.amountOut, trade.meta.decimalsOut) : "--"}
                </span>
              </div>

              <div className="flex justify-between text-[11px] text-[#4a6080] tracking-widest">
                <span className="text-[9px] text-[#4a6080] tracking-widest">Slippage tolerance</span>
                <span className="text-[#00e676] font-bold">
                  {trade ? "1%" : "--"}
                </span>
              </div>
            </div>
          )
        }

        {
          !signer ? (
            <>
              <WalletButtons miniButton={false} setSigner={setSigner} />
            </>
          ) : (
            <>
              {trade && <Trade trade={trade} dexes={dexes} signer={signer} />}
              <button className="mt-3 w-full bg-[#00e5ff] hover:bg-[#00b8d4] text-black font-bold py-3.5 text-xs tracking-[0.2em] uppercase transition-colors" type="submit">
                SUBMIT
              </button>
            </>
          )
        }

        {/* {signer && trade && (
          <div className="mt-3 border border-[#1e2d3d] p-3 bg-[#131920] space-y-2">
            <div className="flex justify-between pb-2 border-b border-[#1e2d3d]">
              <span className="text-[9px] text-[#4a6080] tracking-widest">ROUTE</span>
              <span className="text-[9px] text-white">{dex?.name ?? '—'} <span className="text-[#00e676]">✓ BEST</span></span>
            </div>
            {[
              ['Rate', `1 WETH = ${Number(formatUnits(trade.amountOut, trade.meta.decimalsOut)).toFixed(2)} USDC`],
              ['Sold', formatUnits(trade.amountIn, trade.meta.decimalsIn)],
              ['Slippage', '1.00%'],
            ].map(([l, v]) => (
              <div key={l} className="flex justify-between">
                <span className="text-[10px] text-[#4a6080]">{l}</span>
                <span className="text-[10px] text-zinc-300">{v}</span>
              </div>
            ))}
          </div>
        )}

        {/* cta  */}
        {/* {!signer ? (
          <WalletButtons miniButton={false} setSigner={setSigner} />
        ) : (
          <>
            {trade && <Trade trade={trade} dexes={dexes} signer={signer} />}
            <button type="submit"
              className="mt-3 w-full bg-[#00e5ff] hover:bg-[#00b8d4] text-black font-bold py-3.5 text-xs tracking-[0.2em] uppercase transition-colors"
            >
              SWAP TOKENS
            </button>
          </>
        )}  */}

        {/* <div className="space-y-2"> */}

        {/* Receive Section */}
        {/* <div className="bg-zinc-950/60 p-4 rounded-xl border border-white/5 group-hover:border-white/10 transition-colors">
            <div className="flex justify-between text-[10px] uppercase tracking-wider text-zinc-500 mb-3 font-bold">
              <span>You Receive</span>
              <span>Balance: 0.00</span>
            </div>
            <div className="flex justify-between items-center">
              <div
                id="tokenOut"
                className="bg-transparent text-3xl text-white outline-none w-full font-mono placeholder:text-zinc-800 "
                onClick={() => {
                  setSelectingFor("out")
                  setOpenTokenSelector(true)
                }}
              >
                {
                  trade ? Number(formatUnits(trade.amountOut, trade.meta.decimalsOut)).toFixed(6) + "..." : "0"
                }
              </div>
              <div className="bg-cyan-400 px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                <div className="w-5 h-5 bg-black/20 rounded-full flex items-center justify-center text-[10px] text-black">$</div>
                <span className="text-black font-bold text-sm">USDC</span>
                <svg className="w-3 h-3 text-black/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div> */}
        {/* </div> */}

        {/* {openTokenSelector && (
            <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center">

              {/* modal card */}
        {/* <div className="bg-zinc-900 border border-white/10 rounded-2xl w-[360px] max-h-[70vh] overflow-hidden shadow-2xl">

                {/* header */}
        {/* <div className="p-4 border-b border-white/10">
                  <h2 className="text-white font-bold text-lg">Select Token</h2>
                  <p className="text-xs text-zinc-400">Choose token for swap</p>
                </div>

                {/* token list */}
        {/* <div className="max-h-[50vh] overflow-y-auto">
                  {tokenList.map((token) => (
                    <div
                      key={token.address}
                      onClick={() => {
                        if (selectingFor === "in") {
                          setTokenIn(token.address);
                        } else {
                          setTokenOut(token.address);
                        }

                        setOpenTokenSelector(false);
                      }}
                      className="flex items-center justify-between p-3 hover:bg-zinc-800 cursor-pointer transition-all border-b border-white/5"
                    >
                      <div>
                        <div className="text-white font-semibold">{token.symbol}</div>
                        <div className="text-[10px] text-zinc-500 truncate w-[240px]">
                          {token.address}
                        </div>
                      </div>

                      <div className="text-zinc-400 text-xs">›</div>
                    </div>
                  ))}
                </div>

                {/* footer */}
        {/* <div className="p-3 border-t border-white/10 flex justify-end">
                  <button
                    onClick={() => setOpenTokenSelector(false)}
                    className="text-sm text-zinc-400 hover:text-white transition"
                  >
                    Close
                  </button>
                </div>

              </div>
            </div>
          )} */}
        {/* Amount section  */}
        {/* <div className="bg-zinc-950/60 p-4 rounded-xl border border-white/5 group-hover:border-white/10 transition-colors">
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
          </div> */}

        {/* </div> */}




      </form >
    </div >
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

