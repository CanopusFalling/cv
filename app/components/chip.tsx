import React, { ReactNode } from "react";

interface ChipProps {
  children: ReactNode;
}

interface ChipContainerProps {
  children: ReactNode;
}

export const ChipContainer: React.FC<ChipContainerProps> = ({ children }) => {
  return <div className="flex flex-wrap gap-2 gap-y-1">{children}</div>;
};

const Chip: React.FC<ChipProps> = ({ children }) => {
  return (
    <div className="bg-neutral-300 shadow-md dark:shadow-sm dark:bg-neutral-700 dark:shadow-neutral-600 print:bg-neutral-100 p-1 px-4 rounded-full text-sm">
      {children}
    </div>
  );
};

export default Chip;
