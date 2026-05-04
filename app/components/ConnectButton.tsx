"use client"

import { useState } from "react";
import {ethers} from 'ethers'

interface Window {
    ethereum?: any;
}

export default function WalletButtons({ miniButton , setSigner}: { miniButton: boolean , setSigner: any}) {
    const [error, setError] = useState("");

    const connect = async () => {
        const ethereum = (window as any).ethereum;

        if (!ethereum) {
            setError("You need to install Metamask before using this app");
            return;
        }

            try {
                const provider =  new ethers.BrowserProvider(ethereum);
                const signer = await provider.getSigner();
                setSigner(signer)
            } catch (err) {
                setError("User rejected the connection");
            }
    };

        if (miniButton) {
            return (
                <div>
                    <ConnectButtonMini onConnect={connect} />
    
                    <ErrorDialog message={error} onClose={() => setError("")} miniButton={true}/>
                </div>
            )
        }
        else {
            return (
                <div>
                    <ConnectButton onConnect={connect} />
    
                    <ErrorDialog message={error} onClose={() => setError("")} miniButton={false} />
                </div>
            );
        }


}

export function ConnectButtonMini({ onConnect }: { onConnect: () => void }) {

    return (
        <div>
            <button onClick={onConnect} className="bg-cyan-400 text-black px-6 py-2 rounded-sm font-bold hover:bg-cyan-300 active:scale-95 transition-all" type="button">
                Connect Wallet
            </button>
        </div>
    )
}

export function ConnectButton({ onConnect }: { onConnect: () => void }) {
    return (
        <button onClick={onConnect} className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-black py-4 rounded-xl mt-8 transition-all shadow-[0_0_30px_rgba(34,211,238,0.25)] active:scale-[0.98] uppercase tracking-wider" type="button">
            Connect Wallet
        </button>
    )
}


function ErrorDialog({ message, onClose, miniButton }: { message: string; onClose: () => void, miniButton: boolean }) {
    if (!message) return null;

    if (miniButton) {

        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black/30 h-screen w-screen z-50 ">
                <div className=" bg-white text-black rounded-lg p-6 w-80 shadow-xl">
                    <h2 className="text-lg font-bold mb-2">Error</h2>
                    <p className="mb-4">{message}</p>
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
                        type="button"
                    >
                        Close
                    </button>
                </div>
            </div>
        )
    } else {

        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                <div className="bg-white text-black rounded-lg p-6 w-80 shadow-xl">
                    <h2 className="text-lg font-bold mb-2">Error</h2>
                    <p className="mb-4">{message}</p>
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
                        type="button"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }
}