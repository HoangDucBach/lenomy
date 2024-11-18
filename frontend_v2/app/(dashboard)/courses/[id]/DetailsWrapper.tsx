"use client";

import { Button } from "@nextui-org/button";

import {
  LandpagePinkLightSvg,
  LandpagePurpleLightSvg,
} from "@/components/icons";
import { Field } from "@/components/ui";
import { useCourse } from "@/contexts";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}
export default function DetailsWrapper({ ...props }: Props) {
  const course = useCourse();
  const Header = () => {
    return (
      <div className="flex flex-col gap-4 z-10 flex-1">
        <h1 className="text-4xl font-bold text-foreground">{course.name}</h1>
        <p className="text-base font-medium text-foreground">
          {course.description}
        </p>
      </div>
    );
  };

  const Fields = () => {
    return (
      <div className="flex flex-col gap-1 z-10">
        <Field
          name="Rental Price"
          value={course.rentalUnitPrice.toString() + "/1min"}
        />
        <Field name="Price" value={course.price.toString()} />
      </div>
    );
  };

  const Footer = () => {
    return (
      <div className="w-full flex flex-row gap-4 justify-end items-center">
        <Button radius="lg" onClick={() => {}}>
          Rent
        </Button>
        <Button radius="lg" onClick={() => {}}>
          Buy
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 flex-1 h-full" {...props}>
      <LandpagePinkLightSvg className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-0" />
      <LandpagePurpleLightSvg className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 -z-0" />
      <Header />
      <Fields />
      <Footer />
    </div>
  );
}
