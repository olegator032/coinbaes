import React, { useEffect, useState } from 'react';
import { Button } from "@chakra-ui/react";
import { shortenAddress } from "../../utils/shortenAddress";
import Link from "next/link";


export const PhantomConnect = () => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);
  

  // Actions
  const checkIfWalletIsConnected = async () => {
    if (window?.solana?.isPhantom) {
      console.log('Phantom wallet found!');
      const response = await window.solana.connect({ onlyIfTrusted: true });
      console.log(
        'Connected with Public Key:',
        response.publicKey.toString()
      );
      /*
       * Set the user's publicKey in state to be used later!
       */
      setWalletAddress(response.publicKey.toString());
    } else {
      alert('Solana object not found! Get a Phantom Wallet 👻');
    }
  };

  const connectWallet = async () => {
    const { solana } = window;
  
    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );


  // UseEffects
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

    if(!walletAddress) {
        return (<Button className="Wallet" style={{
        fontFamily: "'Press Start 2P', cursive",
        color: "#4b4f56",
        borderRadius: "0",
      }} >
			{renderNotConnectedContainer()}
       </Button>)
}
    else { 
            return (
                <Link href="/mint" passHref>
            <Button className="Wallet" style={{
        fontFamily: "'Press Start 2P', cursive",
        color: "#4b4f56",
        borderRadius: "0",
    }} >
        {shortenAddress(walletAddress)}
   </Button>
   </Link>)}
}