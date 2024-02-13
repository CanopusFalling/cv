"use client";

import React, { ReactNode } from "react";

interface PrintLinkProps {
  children: ReactNode;
}

const PrintLink: React.FC<PrintLinkProps> = ({ children }) => {
  const link = window.location.href;

  return (
    <div className="hidden print:block">
      You can view a fully accessible version of this CV at
      <a href={link} className="text-primary">
        {` `}
        {link}
      </a>
    </div>
  );
};

export default PrintLink;
