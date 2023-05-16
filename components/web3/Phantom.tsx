import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { shortenAddress } from "../../utils/shortenAddress";

export const PhantomConnect = () => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);
  const { solana } = window;

  // Actions
  const checkIfWalletIsConnected = async () => {
    if (solana?.isPhantom) {
      console.log("Phantom wallet found!");
      try {
        const response = await solana.connect({ onlyIfTrusted: true });
        console.log(
          "Connected with Public Key:",
          response.publicKey.toString()
        );
        /*
         * Set the user's publicKey in state to be used later!
         */
        setWalletAddress(response.publicKey.toString());
      } catch (error) {
        console.error("Failed to connect to solana");
      }
    } else {
      alert("Solana object not found! Get a Phantom Wallet 👻");
    }
  };

  const connectWallet = async () => {
    if (solana) {
      const response = await solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const disconnectWallet = async () => {
    alert("Disconnecting from your wallet");
    if (solana) {
      // After asking if user want to disconnect -> await solana.disconnect();
      // setWalletAddress(null);
      // Check if solana is null too
    }
  };

  // UseEffects
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <Button
      className="Wallet"
      style={{
        fontFamily: `'Press Start 2P', cursive`,
        color: "#4b4f56",
        borderRadius: "0",
      }}
      onClick={!walletAddress ? connectWallet : disconnectWallet}
    >
      {!walletAddress ? "Connect to Wallet" : shortenAddress(walletAddress)}
    </Button>
  );
};
