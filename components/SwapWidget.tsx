import CogIcon from "./CogIcon";
import SwapIcon from "./SwapIcon";

export const SwapWidget = () => (
  <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl relative overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none"></div>
    
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
            type="text" 
            placeholder="0.0" 
            className="bg-transparent text-3xl text-white outline-none w-full font-mono placeholder:text-zinc-800" 
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
            type="text" 
            placeholder="0.0" 
            className="bg-transparent text-3xl text-white outline-none w-full font-mono placeholder:text-zinc-800" 
          />
          <div className="bg-cyan-400 px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)]">
             <div className="w-5 h-5 bg-black/20 rounded-full flex items-center justify-center text-[10px] text-black">$</div>
             <span className="text-black font-bold text-sm">USDC</span>
             <svg className="w-3 h-3 text-black/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>
    </div>

    {/* Transaction Details */}
    <div className="mt-6 space-y-3 px-1">
      <div className="flex justify-between text-[11px]">
        <span className="text-zinc-500">Exchange Rate</span>
        <span className="text-zinc-300 font-mono">1 ETH = 2,451.20 USDC</span>
      </div>
      <div className="flex justify-between text-[11px]">
        <span className="text-zinc-500">Price Impact</span>
        <span className="text-green-400 font-bold">&lt;0.01%</span>
      </div>
      <div className="flex justify-between text-[11px]">
        <span className="text-zinc-500">Slippage Tolerance</span>
        <span className="text-zinc-300">0.5%</span>
      </div>
    </div>

    <button className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-black py-4 rounded-xl mt-8 transition-all shadow-[0_0_30px_rgba(34,211,238,0.25)] active:scale-[0.98] uppercase tracking-wider">
      Connect Wallet
    </button>
  </div>
);

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

