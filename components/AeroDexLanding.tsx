import Head from "next/head";
import { Navbar } from "./Navbar";
import { FeatureCard, SwapWidget } from "./SwapWidget";

export default function AeroDexLanding() {
  return (
    <div className="min-h-screen bg-[#0c0e12] text-zinc-300 font-['Space_Grotesk'] selection:bg-cyan-400 selection:text-black">
      <Head>
        <title>AERO_DEX | Aggregated Liquidity for Professionals</title>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Head>

      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-40 overflow-hidden px-6">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20 relative z-10">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 mb-8">
                 <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                 <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">Protocol V1 Live on Mainnet</span>
              </div>
              
              <h1 className="text-5xl lg:text-8xl font-bold text-white mb-8 leading-[0.9] tracking-tighter">
                The Next <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Generation</span> 
                <br />of Liquidity
              </h1>
              
              <p className="text-zinc-500 text-lg mb-12 max-w-xl leading-relaxed">
                Aggregating deep liquidity across 12+ chains. Engineered for the lowest slippage, fastest execution, and maximum yield.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <button className="bg-cyan-400 text-black px-10 py-4 font-black rounded-lg hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] transition-all active:scale-95 uppercase tracking-widest text-sm">
                  Start Trading
                </button>
                <button className="bg-zinc-900 border border-white/10 text-white px-10 py-4 font-bold rounded-lg hover:bg-zinc-800 transition-all active:scale-95 text-sm">
                  Documentation
                </button>
              </div>

              <div className="mt-16 flex items-center gap-6 justify-center lg:justify-start">
                 <div className="flex -space-x-3">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0c0e12] bg-zinc-800"></div>
                   ))}
                 </div>
                 <span className="text-xs text-zinc-500 font-medium">Trusted by <span className="text-white font-bold">15,000+</span> traders daily</span>
              </div>
            </div>

            <div className="flex-1 w-full flex justify-center lg:justify-end relative">
               {/* Decorative Glow behind widget */}
               <div className="absolute inset-0 bg-cyan-400/10 blur-[80px] rounded-full scale-75 opacity-50"></div>
               <SwapWidget />
            </div>
          </div>
        </section>

        {/* Networks Section */}
        <section className="py-20 border-y border-white/5 bg-zinc-950/20">
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
        <section className="py-40 px-6 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-10">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">Precision Engineered <br />Infrastructure</h2>
                <p className="text-zinc-500 text-lg leading-relaxed">Our advanced routing algorithm scans hundreds of liquidity sources in milliseconds to find the most efficient path for your capital, every single time.</p>
              </div>
              <div className="flex bg-zinc-950 p-1.5 rounded-xl border border-white/5 text-[10px] font-black uppercase tracking-widest">
                <button className="bg-zinc-800 px-6 py-2.5 text-white rounded-lg shadow-inner">Execution</button>
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
          </div>
        </section>
      </main>

      <Footer />
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