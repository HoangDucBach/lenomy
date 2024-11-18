"use client";

import React from "react";

import { CourseProvider } from "@/contexts/course";
import { CourseData } from "@/types/contract";

interface Props {
  children: React.ReactNode;
  course?: CourseData;
}
export const Providers = ({ children, course }: Props) => {
  return <CourseProvider course={course}>{children}</CourseProvider>;
};
