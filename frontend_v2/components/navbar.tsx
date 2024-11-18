"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import { IoMdAddCircle } from "react-icons/io";
import { BiSolidDashboard } from "react-icons/bi";

const WalletConnect = dynamic(() => import("../components/Metamask"), {
  ssr: false,
});

import dynamic from "next/dynamic";

import { Logo } from "@/components/icons";

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
        <NextLink href="/dashboard">
          <NavbarBrand
            as="li"
            className="gap-1 hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <BiSolidDashboard className="text-foreground-500" />
            <p>Dashboard</p>
          </NavbarBrand>
        </NextLink>
        <NextLink href="/create-course">
          <NavbarBrand
            as="li"
            className="gap-1 hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <IoMdAddCircle className="text-foreground-500" />
            <p>Create</p>
          </NavbarBrand>
        </NextLink>
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
