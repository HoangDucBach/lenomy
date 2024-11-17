import { NFTCourseContainer } from "./NFTCourseContainer";

import {
  LandpagePinkLightSvg,
  LandpagePurpleLightSvg,
} from "@/components/icons";

export default function Page() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <LandpagePinkLightSvg className="absolute z-0 top-1/2 left-0 -translate-x-[50%] -translate-y-1/2 transform" />
      <LandpagePurpleLightSvg className="absolute z-0 top-1/2 right-0 translate-x-1/2 -translate-y-1/2 transform" />
      <NFTCourseContainer className="z-10" />
    </section>
  );
}
