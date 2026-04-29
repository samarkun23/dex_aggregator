
export function Navbar() {
    return (
        <nav className="bg-zinc-950/80 backdrop-blur-xl flex justify-between items-center px-6 py-4 w-full sticky top-0 z-50 border-b border-white/10 font-['Space_Grotesk'] tracking-tight">
            <div className="text-xl font-bold tracking-tighter text-cyan-400 uppercase">AERO_DEX</div>
            <div className="hidden md:flex gap-8 items-center text-lg">
                <a href="#" className="text-cyan-400 border-b-2 border-cyan-400 pb-1">Swap</a>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors">Liquidity</a>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors">Stake</a>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors">Analytics</a>
            </div>
            <button className="bg-cyan-400 text-black px-6 py-2 rounded-sm font-bold hover:bg-cyan-300 active:scale-95 transition-all">
                Connect Wallet
            </button>
        </nav>

    )
}