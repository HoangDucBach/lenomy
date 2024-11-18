import clsx from "clsx";

export const Field = ({ name, value }: { name: string; value: string }) => (
  <div
    className={clsx(
      "flex gap-2 w-full justify-between",
      "hover:bg-foreground-50/25 rounded-lg p-2",
    )}
  >
    <p className="font-medium text-foreground-500 text-sm">{name}</p>
    <p>{value}</p>
  </div>
);
