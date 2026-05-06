"use client"

import { Contract } from "ethers";
import { useState } from "react"
import blockchain from '../blockchain.json'

const slippageTolerance = 1; //%

export const Trade = ({ dexes, trade, signer }: { dexes: any, trade: any, signer: any }) => {
    const [executingTrade, setExecutingTrade] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [error, setError] = useState(false);

    const dex = dexes.find((dex: { address: any }) => dex.address === trade.address);


    const executeTrade = async () => {
        setExecutingTrade(true)

        try {
            if (!dex || !dex.contract) {
                throw new Error("DEX not found");
            }

            if (trade.tokenIn === trade.tokenOut) {
                throw new Error("Same token swap not allowed");
            }

            const tokenInContract = new Contract(trade.tokenIn, blockchain.erc20Abi, signer)
            const amountInMax = (trade.amountIn * BigInt(100 + slippageTolerance)) / BigInt(100); // max amount i want

            // 1 approve

            // we can add allowance but i was thinking that user need to track all the transactions.

            const tx1 = await tokenInContract.approve(dex.address, amountInMax);
            const receipt1 = await tx1.wait();
            if (receipt1.status !== 1) {
                throw new Error("approve() transaction failed.");
            }

            // 2 swap 
            const amountOutMin = trade.amountOut * BigInt(100 - slippageTolerance) / BigInt(100);
            const deadline = Math.floor(Date.now() / 1000) + 60 * 10;

            

            // 3 trx 
            const trx2 = await dex.contract.swapExactTokensForTokens(
                trade.amountIn,
                amountOutMin,
                [trade.tokenIn, trade.tokenOut],
                await signer.getAddress(),
                deadline
                
            )

            await trx2.wait();

            setConfirmed(true);

        } catch (error) {
            console.log(error)
            setError(true);
        } finally {
            setExecutingTrade(false)
        }
    }

    return (
        <>
            <h3>The best price is </h3>
            <button className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-black py-4 rounded-xl mt-8 transition-all shadow-[0_0_30px_rgba(34,211,238,0.25)] active:scale-[0.98] uppercase tracking-wider" type="button"
                onClick={executeTrade}
                disabled={executingTrade}
            >Trade</button>
            {executingTrade && <div className="alert alert-info mt-4 mb-0">Your trade is processing. Please wait until the trx mined.</div>}
            {confirmed && <div className="alert alert-info mt-4 mb-0">Congrats! Your trade was successful. </div>}
            {error && <div className="alert alert-danger mt-4 mb-0">Ooops... Your swap fail please try again. </div>}

        </>
    )
}