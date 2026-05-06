"use client"
import AeroDexLanding from "@/components/AeroDexLanding";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import blockchain from './blockchain.json';
import { Contract } from "ethers";

export type Dex = {
  contract: Contract | undefined,
  name: string,
  address: string
}

export default function Home() {
  // initial dexes
  /*
    {
      name:
      address:
      contract: undefined
    } 
  */

  const initialDexes = blockchain.dexes.map(dex => (
    {
      ...dex,
      ...{ contract: undefined }
    }
  ));
  const [signer, setSigner] = useState(undefined);
  const [dexes, setDexes] = useState<Dex[]>(initialDexes);
  const [trade, setTrade] = useState(undefined);
  const [token, setToken] = useState(undefined)

  useEffect(() => {
    if (signer) {
      const newDexes = dexes.map(dex => (
        {
          ...dex,
          ...{ contract: new Contract(dex.address, blockchain.dexAbi, signer) }
        }
      ))
      setDexes(newDexes);
    }
  }, [signer])

  return (
    <div className=" bg-zinc-50 dark:bg-black">
      <AeroDexLanding
        setSigner={setSigner}
        dexes={dexes}
        signer={signer}
        setTrade={setTrade}
        setToken={setToken}
        trade={trade}
        token={token}
      />
    </div>
  );
}
