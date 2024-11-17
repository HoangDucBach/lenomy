"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@nextui-org/navbar";
import { Kbd } from "@nextui-org/kbd";
import { Input } from "@nextui-org/input";
import NextLink from "next/link";

import { WalletConnect } from "./Metamask";

import { SearchIcon, Logo } from "@/components/icons";

export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

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
