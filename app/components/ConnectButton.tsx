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
            <button onClick={onConnect} className=" w-full bg-[#00e5ff] hover:bg-[#00b8d4] text-black font-bold py-3.5 px-2 text-xs tracking-[0.2em] uppercase transition-colors" type="button">
                Connect Wallet
            </button>
        </div>
    )
}

export function ConnectButton({ onConnect }: { onConnect: () => void }) {
    return (
        <button onClick={onConnect} className="mt-3 w-full bg-[#00e5ff] hover:bg-[#00b8d4] text-black font-bold py-3.5 text-xs tracking-[0.2em] uppercase transition-colors" type="button">
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