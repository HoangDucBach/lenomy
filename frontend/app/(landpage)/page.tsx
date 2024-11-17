import { Button } from "@/components/ui/button";
import { Center, Heading } from "@chakra-ui/react";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Center className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Heading as="h1" size="7xl" className="text-center">
          NFT Course PLatform
        </Heading>
        <p className="text-xl font-medium text-foreground text-center">
          Web3 rental and purchase marketplace for tokenized educational content and NFT-based courses
        </p>
        <Button>
          Launch App
        </Button>
      </Center>
    </div>
  );
}
