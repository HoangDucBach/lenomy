import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon, LandpagePinkLightSvg, LandpagePurpleLightSvg } from "@/components/icons";
import NextImage from "next/image";
import { Button } from "@nextui-org/button";
import { NFTCourseContainer } from "./NFTCourseContainer";

export default function Page() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <LandpagePinkLightSvg className="absolute z-0 top-1/2 left-0 -translate-x-[50%] -translate-y-1/2 transform"/>
        <LandpagePurpleLightSvg className="absolute z-0 top-1/2 right-0 translate-x-1/2 -translate-y-1/2 transform"/>
        <NFTCourseContainer className="z-10"/>
    </section >
  );
}
