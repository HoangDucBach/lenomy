"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@nextui-org/navbar";
import { Kbd } from "@nextui-org/kbd";
import { Input } from "@nextui-org/input";
import NextLink from "next/link";

const WalletConnect = dynamic(() => import("../components/Metamask"), {
  ssr: false,
})

import { Logo } from "@/components/icons";
import dynamic from "next/dynamic";

export const Navbar = () => {
  return (
    <NextUINavbar
      classNames={{
        base: "bg-transparent",
        wrapper:
          "bg-[#1E1E1E]/50 backdrop-blur-lg rounded-full mt-4 border border-default/25",
      }}
      isBlurred={false}
      maxWidth="lg"
      position="sticky"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">Lenomy</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="center">
        <p className="text-base text-foreground-500">Welcome to Lenomy</p>
      </NavbarContent>
      <NavbarContent justify="end">
        <WalletConnect />
      </NavbarContent>
    </NextUINavbar>
  );
};
