"use client";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}
export default function ContentWrapper({ ...props }: Props) {
  const [hasAccess, setHasAccess] = React.useState(false);

  return (
    <div className="flex-1 h-full z-10 rounded-3xl bg-foreground-100 relative">
      {!hasAccess && (
        <p className="text-foreground-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          You don&apos;t have access to this course
        </p>
      )}
    </div>
  );
}
