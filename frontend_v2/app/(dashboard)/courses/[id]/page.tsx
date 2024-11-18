import React from "react";
import { notFound } from "next/navigation";

import { Providers } from "./providers";
import DetailsWrapper from "./DetailsWrapper";
import ContentWrapper from "./ContentWrapper";

import { mockCourseData } from "@/mock";

interface Props {
  params: {
    id: string;
  };
}
export default async function Page({ params }: Props) {
  const { id } = params;

  const fetchCourse = async () => {
    try {
      return mockCourseData;
    } catch (err) {
      notFound();
    }
  };

  const course = await fetchCourse();

  return (
    <Providers course={course}>
      <div className="flex flex-row gap-6 w-full h-full py-4 items-center justify-center">
        <DetailsWrapper />
        <ContentWrapper />
      </div>
    </Providers>
  );
}
