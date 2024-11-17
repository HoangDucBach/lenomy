"use client";

import { useSDK } from "@metamask/sdk-react";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { ethers } from "ethers";
import { Image } from "@nextui-org/react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
}
export function WalletConnect({ ...props }: Props) {
  const { sdk, connected, connecting, account, chainId } = useSDK();
  const [icon, setIcon] = useState<string | null>(null);
  const truncate = (str: string) => str.slice(0, 6) + "..." + str.slice(-4);
  const connect = async () => {
    try {
      await sdk?.connect();
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  }

  const [ethBalance, setEthBalance] = useState<string | null>(null);

  const fetchBalance = async () => {
    if (sdk && account) {
      try {
        //@ts-ignore
        const provider = new ethers.BrowserProvider(await sdk.provider);
        const balance = await provider.getBalance(account);
        setEthBalance(ethers.formatEther(balance));
      } catch (err) {
        console.warn("failed to fetch balance..", err);
      }
    }
  };

  useEffect(() => {
    if (account) {
      fetchBalance();
    }
  }, [account]);

  return (
    <>
      {account ? (
        <div className="flex flex-row gap-2 items-center">
          <Image src={"https://assets.coingecko.com/coins/images/38058/standard/icon.png?1717626867"} width={24} height={24} alt={chainId} />
          <p className="text-md text-foreground-500 font-medium">{ethBalance}</p>
          <p className="text-md text-foreground font-medium">{truncate(account)}</p>
        </div>
      ) : (
        <Button onClick={connect} radius="full" isLoading={connecting}>
          Connect Wallet
        </Button>
      )}
    </>
  )
}