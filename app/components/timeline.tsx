import React, { ReactNode } from "react";

interface TimelineElementProps {
  start: string;
  end?: string;
  title?: string;
  children: ReactNode;
}

interface TimelineProps {
  children: ReactNode;
}

export const TimelineElement: React.FC<TimelineElementProps> = ({
  start,
  end,
  title,
  children,
}) => (
  <li className="break-inside-avoid">
    <div className="flex">
      <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-neutral-600 dark:bg-neutral-500"></div>
      <p className="text-sm text-neutral-700 dark:text-neutral-200">
        {start} {end && `- ${end}`}
      </p>
    </div>
    <div className="mb-4 ml-4 mt-2">
      {title && <h4 className="mb-1.5 text-xl font-semibold">{title}</h4>}
      {children && (
        <div className="mb-3 text-neutral-800 dark:text-white">{children}</div>
      )}
    </div>
  </li>
);

const Timeline: React.FC<TimelineProps> = ({ children }) => (
  <ol className="border-l border-neutral-600 dark:border-neutral-500">
    {children}
  </ol>
);

export default Timeline;
