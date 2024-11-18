"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

import { CourseData } from "@/types/contract";
const CourseContext = createContext<CourseData | undefined>(undefined);

interface CourseProviderProps {
  children: ReactNode;
  course?: CourseData;
}

export const CourseProvider = ({ children, course }: CourseProviderProps) => {
  const [currentCourse, setCurrentCourse] = useState<CourseData | undefined>(
    course,
  );

  return (
    <CourseContext.Provider value={currentCourse}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);

  if (context === undefined) {
    throw new Error("useCourse must be used within a CourseProvider");
  }

  return context;
};
