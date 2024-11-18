"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";

import { Field } from "../ui";

import { CourseData } from "@/types/contract";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  course: CourseData;
}

export function NFTCourse({ course, ...props }: Props) {
  const router = useRouter();

  return (
    <div
      className={clsx(
        "flex flex-col gap-2 p-4 bg-foreground-50/25 backdrop-blur-lg border-2 border-default/25 rounded-3xl w-full min-w-[300px] aspect-w-1 aspect-h-1",
        "hover:scale-[101%] transition-transform duration-300 ease-in-out",
        "cursor-pointer",
      )}
      role="link"
      onClick={() => router.push(`/courses/${3}`)}
      {...props}
    >
      <h1 className="font-bold text-lg w-full">{course.name}</h1>
      <Field name="Rental Price" value={course.rentalUnitPrice.toString()} />
      <Field name="Price" value={course.price.toString()} />
    </div>
  );
}
