import Head from "next/head";
import { Navbar } from "./Navbar";
import { FeatureCard, SwapWidget } from "./SwapWidget";
import { Dex } from "@/app/page";
import DexChart from "./Candlestick";

export default function AeroDexLanding({ setSigner, dexes, signer, setTrade, setToken, trade, token }: { setSigner: any, dexes: Dex[], signer: any, setTrade: any, setToken: any, trade: any, token: any }) {
    return (
        <div className="min-h-screen bg-[#0c0e12] text-zinc-300 font-['Space_Grotesk'] selection:bg-cyan-400 selection:text-black">
            <Head>
                <title>AERO_DEX | Aggregated Liquidity for Professionals</title>
                <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap" rel="stylesheet" />
            </Head>

            {/* <Navbar setSigner={setSigner} signer={signer} /> */}

            <main>
                {/* Hero Section */}
                {/* <section className="h-[calc(100vh-52px)] grid grid-cols-[1fr_340px]">
                    {/* Chart - Left */}
                {/* <div className="border-r border-white/5 flex flex-col"> */}
                {/* <DexChart /> */}
                {/* </div> */}
                {/* Swap - Right */}
                {/* <div className="bg-zinc-900/50"> */}
                {/* <SwapWidget setSigner={setSigner} dexes={dexes} signer={signer} setTrade={setTrade} setToken={setToken} trade={trade} token={token} /> */}
                {/* </div> */}
                {/* </section> */}
                <div className="h-screen bg-[#080b10] text-zinc-300 font-['IBM_Plex_Mono'] flex flex-col overflow-hidden">
                    <Navbar setSigner={setSigner} signer={signer} />

                    {/* Main Trading Layout */}
                    <main className="flex-1 grid grid-cols-[1fr_360px] min-h-0">

                        {/* LEFT: Chart */}
                        <div className="flex flex-col border-r border-[#1e2d3d] min-h-0">

                            {/* Chart Header */}
                            <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e2d3d] bg-[#0d1117] flex-shrink-0">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex">
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#627EEA] to-[#8B5CF6] border-2 border-[#080b10] flex items-center justify-center text-[9px] text-white font-bold z-10">Ξ</div>
                                            <div className="w-6 h-6 rounded-full bg-[#2775CA] border-2 border-[#080b10] flex items-center justify-center text-[9px] text-white font-bold -ml-2">$</div>
                                        </div>
                                        <span className="text-sm font-bold text-white tracking-wide">WETH / USDC</span>
                                        <span className="text-[9px] text-[#4a6080] bg-[#131920] px-2 py-0.5 tracking-widest">UNISWAP V3</span>
                                    </div>
                                    <span className="text-xl font-bold text-white">$2,847.50</span>
                                    <span className="text-xs text-[#00e676] font-semibold">+2.34%</span>
                                </div>

                                {/* Timeframe buttons */}
                                <div className="flex gap-0.5">
                                    {['5M', '15M', '1H', '4H', '1D'].map((t, i) => (
                                        <button key={t} className={`text-[10px] px-3 py-1.5 border tracking-widest font-mono transition-colors ${i === 1
                                                ? 'bg-[#00e5ff] text-black border-[#00e5ff] font-bold'
                                                : 'bg-transparent text-[#4a6080] border-[#1e2d3d] hover:text-white'
                                            }`}>{t}</button>
                                    ))}
                                </div>
                            </div>

                            {/* Chart - fills remaining space */}
                            <div className="flex-1 min-h-0 bg-[#0d1117]">
                                <DexChart />
                            </div>

                            {/* Bottom Stats */}
                            <div className="flex gap-6 px-5 py-2.5 border-t border-[#1e2d3d] bg-[#0d1117] flex-shrink-0">
                                {[
                                    ['24H HIGH', '$2,934.20', 'text-[#00e676]'],
                                    ['24H LOW', '$2,781.40', 'text-[#ff1744]'],
                                    ['24H VOL', '$1.24B', 'text-zinc-300'],
                                    ['LIQUIDITY', '$847M', 'text-zinc-300'],
                                    ['FEE TIER', '0.05%', 'text-[#00e5ff]'],
                                ].map(([label, value, color]) => (
                                    <div key={label}>
                                        <div className="text-[8px] text-[#4a6080] tracking-widest mb-0.5">{label}</div>
                                        <div className={`text-[11px] font-semibold ${color}`}>{value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT: Swap Widget */}
                        <div className="bg-[#0d1117] flex flex-col overflow-y-auto">
                            <SwapWidget
                                setSigner={setSigner} dexes={dexes} signer={signer}
                                setTrade={setTrade} setToken={setToken} trade={trade} token={token}
                            />
                        </div>
                    </main>
                </div>
                );


                {/* Networks Section */}
                {/* <section className="py-20 border-y border-white/5 bg-zinc-950/20">
                    <div className="max-w-7xl mx-auto px-6">
                        <h5 className="text-[10px] tracking-[0.4em] uppercase text-zinc-600 mb-12 font-black text-center">Deep Liquidity Infrastructure</h5>
                        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
                            <div className="flex items-center gap-3 font-bold text-white text-lg">
                                <div className="w-6 h-6 bg-blue-500/20 rounded-full"></div> ETHEREUM
                            </div>
                            <div className="flex items-center gap-3 font-bold text-white text-lg">
                                <div className="w-6 h-6 bg-cyan-500/20 rounded-full"></div> ARBITRUM
                            </div>
                            <div className="flex items-center gap-3 font-bold text-white text-lg">
                                <div className="w-6 h-6 bg-purple-500/20 rounded-full"></div> POLYGON
                            </div>
                            <div className="flex items-center gap-3 font-bold text-white text-lg">
                                <div className="w-6 h-6 bg-orange-500/20 rounded-full"></div> OPTIMISM
                            </div>
                            <div className="flex items-center gap-3 font-bold text-white text-lg">
                                <div className="w-6 h-6 bg-blue-400/20 rounded-full"></div> BASE
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                {/* <section className="py-40 px-6 relative overflow-hidden">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-10">
                            <div className="max-w-2xl">
                                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">Precision Engineered <br />Infrastructure</h2>
                                <p className="text-zinc-500 text-lg leading-relaxed">Our advanced routing algorithm scans hundreds of liquidity sources in milliseconds to find the most efficient path for your capital, every single time.</p>
                            </div>
                            <div className="flex bg-zinc-950 p-1.5 rounded-xl border border-white/5 text-[10px] font-black uppercase tracking-widest"> */}
                                {/* <button className="bg-zinc-800 px-6 py-2.5 text-white rounded-lg shadow-inner">Execution</button>
                                <button className="px-6 py-2.5 text-zinc-600 hover:text-white transition-colors">Security</button>
                                <button className="px-6 py-2.5 text-zinc-600 hover:text-white transition-colors">Yield</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FeatureCard
                                icon="⚡"
                                title="Ultra-Fast Execution"
                                description="Leveraging direct RPC nodes and private mempools to ensure your swaps land before the competition with zero frontrunning."
                                metric="120ms Avg. latency"
                                accentColor="bg-cyan-400"
                            />
                            <FeatureCard
                                icon="📈"
                                title="Smart Rate Routing"
                                description="Advanced pathfinding across 500+ decentralized exchanges to minimize slippage and maximize output for every trade."
                                metric="0.02% Fee Optimization"
                                accentColor="bg-lime-400"
                            />
                            <FeatureCard
                                icon="🛡️"
                                title="Military-Grade Security"
                                description="Non-custodial infrastructure with automated contract auditing and rugged protection layers built in from the ground up."
                                metric="Fully Audited Contracts"
                                accentColor="bg-white"
                            />
                        </div>
                    </div> */}
                {/* </section> */} 
            </main>

            {/* <Footer /> */}
        </div>
    );
}
const Footer = () => (
    <footer className="bg-zinc-950 border-t border-white/5 font-['Space_Grotesk'] text-sm tracking-wide mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col gap-2">
                <div className="text-lg font-bold text-zinc-200">AERO_DEX</div>
                <p className="text-zinc-500 max-w-xs">The institutional-grade liquidity aggregator for the decentralized future.</p>
            </div>
            <div className="flex gap-6 text-zinc-500">
                <a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a>
                <a href="#" className="hover:text-cyan-400 transition-colors">Security Audits</a>
                <a href="#" className="hover:text-cyan-400 transition-colors">Governance</a>
                <a href="#" className="hover:text-cyan-400 transition-colors">GitHub</a>
            </div>
            <div className="text-zinc-500 italic">
                © 2024 AERO_DEX. Engineered for Precision.
            </div>
        </div>
    </footer>
);
