import { Link } from "@nextui-org/link";
import NextImage from "next/image";
import { Button } from "@nextui-org/button";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <NextImage
        alt="NFT Course Platform"
        className="absolute z-0 top-0 left-0 -translate-x-[25%] -translate-y-[25%] transform"
        height={600}
        src="/landpage-light.svg"
        width={1200}
      />
      <h1 className="text-7xl font-bold text-foreground z-0">
        NFT Course PLatform
      </h1>
      <p className="text-xl font-medium text-foreground-500 text-center max-w-[60%] z-0">
        Web3 rental and purchase marketplace for tokenized educational content
        and NFT-based courses
      </p>
      <Button
        as={Link}
        className="font-medium"
        color="default"
        href="/dashboard"
      >
        Launch App
      </Button>
    </section>
  );
}
