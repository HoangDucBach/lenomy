"use client";

import { useSDK } from "@metamask/sdk-react";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { ethers } from "ethers";
import { Image } from "@nextui-org/react";

interface Props extends React.HTMLAttributes<HTMLDivElement> { }
export default function WalletConnect({ ...props }: Props) {
  const { sdk, balance, connecting, account, chainId } = useSDK();
  const fortmatBalance = (balance: string) => {
    return ethers.formatEther(parseInt(balance).toString())
  }
  const formatAddress = (address: string) => {
    return address.slice(0, 6) + "..." + address.slice(-4);
  }
  const connect = async () => {
    try {
      await sdk?.connect();
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  };
  
  return (
    <>
      {account ? (
        <div className="flex flex-row gap-2 items-center">
          <Image
            alt={chainId}
            height={24}
            src={
              "https://assets.coingecko.com/coins/images/38058/standard/icon.png?1717626867"
            }
            width={24}
          />
          <p className="text-md text-foreground-500 font-medium">
            {fortmatBalance(balance!)}
          </p>
          <p className="text-md text-foreground font-medium">
            {formatAddress(account)}
          </p>
        </div>
      ) : (
        <Button isLoading={connecting} radius="full" onClick={connect}>
          Connect Wallet
        </Button>
      )}
    </>
  );
}
