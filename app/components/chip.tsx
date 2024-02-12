import React, { ReactNode } from "react";

interface ChipProps {children: ReactNode;};

const Chip: React.FC<ChipProps> = ({children}) => {
    return (<div className="bg-neutral-300 shadow-md dark:bg-neutral-700 dark:shadow-neutral-600 p-1 px-4 rounded-full">{children}</div>);
}

export default Chip;