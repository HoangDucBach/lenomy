"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { MetaMaskProvider } from "@metamask/sdk-react";

import { siteConfig } from "@/config/site";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const host =
    typeof window !== "undefined"
      ? window.location.host
      : process.env.NEXT_PUBLIC_HOST;

  return (
    <MetaMaskProvider
      sdkOptions={{
        dappMetadata: {
          name: siteConfig.name,
          url: host,
        },
        infuraAPIKey: process.env.NEXT_PUBLIC_INFURA_API_KEY,
      }}
    >
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </NextUIProvider>
    </MetaMaskProvider>
  );
}
