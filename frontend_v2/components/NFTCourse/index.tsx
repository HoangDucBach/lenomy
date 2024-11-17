import { CourseData } from "@/types/contract";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  course: CourseData;
}

export function NFTCourse({ course, ...props }: Props) {
  const Field = ({ name, value }: { name: string; value: string }) => (
    <div className="flex gap-2 w-full justify-between">
      <p className="font-medium text-foreground-500 text-sm">{name}:</p>
      <p>{value}</p>
    </div>
  );

  return (
    <div
      className="flex flex-col gap-2 p-4 bg-foreground-50/25 backdrop-blur-lg border-2 border-default/25 rounded-3xl w-full min-w-[300px] aspect-w-1 aspect-h-1"
      {...props}
    >
      <h1 className="font-bold text-lg w-full">{course.name}</h1>
      <Field name="Rental Price" value={course.rentalUnitPrice.toString()} />
      <Field name="Price" value={course.price.toString()} />
    </div>
  );
}
