import WalletButtons, { ConnectButtonMini } from "@/app/components/ConnectButton";

export function Navbar({setSigner, signer}: {setSigner: any, signer: any}) {
    return (
        <nav className="bg-zinc-950/80 backdrop-blur-xl flex justify-between items-center px-6 py-4 w-full sticky top-0 z-50 border-b border-white/10 font-['Space_Grotesk'] tracking-tight">
            <div className="text-xl font-bold tracking-tighter text-cyan-400 uppercase">AERO_DEX</div>
            <div className="hidden md:flex gap-8 items-center text-lg">
                <a href="#" className="text-cyan-400 border-b-2 border-cyan-400 pb-1">Swap</a>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors">Liquidity</a>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors">Stake</a>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors">Analytics</a>
            </div>
            {
                signer ? (
                    <div></div>
                ):(
                    <WalletButtons  miniButton={true} setSigner={setSigner}/>
                )
            }
        </nav>

    )
}