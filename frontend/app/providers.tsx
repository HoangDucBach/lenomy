"use client";
import { PropsWithChildren } from "react";
import { Provider } from "@/components/ui/provider"

export default function Providers({ children }: PropsWithChildren<{}>) {
    return (
        <Provider>
            {children}
        </Provider>
    )
}