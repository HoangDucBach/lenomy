import { NFTCourse } from "@/components/NFTCourse";
import { mockCourseData } from "@/mock";
import clsx from "clsx";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
}
export function NFTCourseContainer({ ...props }: Props) {
    return (
        <div
            {...props}
            className={
                clsx(
                    "w-full h-full",
                    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
                    props.className,
                )
            }
        >
            {Array.from({ length: 5 }).map((_, i) => (
                <NFTCourse key={i} course={mockCourseData} />
            ))}
        </div>
    )
}