export const Trade = ({ trade }: { trade: any }) => {
    return(
        <>
            <h3>The best price is </h3> 
            <button className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-black py-4 rounded-xl mt-8 transition-all shadow-[0_0_30px_rgba(34,211,238,0.25)] active:scale-[0.98] uppercase tracking-wider" type="submit">Trade</button>
        </>
    )
}