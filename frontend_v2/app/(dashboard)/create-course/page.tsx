import {  LandpagePinkLightSvg, LandpagePurpleLightSvg } from "@/components/icons";
import CreateCourseForm from "./CreateCourseForm";

export default function Page() {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold text-center z-10 text-foreground">Create NFT Course</h1>
      <LandpagePinkLightSvg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform" />
      <LandpagePurpleLightSvg className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/2 transform" />
      <CreateCourseForm />
    </section >
  );
}
