"use client";

import React, { ReactNode, useEffect, useState } from "react";

interface PrintLinkProps {}

const PrintLink: React.FC<PrintLinkProps> = () => {
  const [link, setLink] = useState<string | undefined>(undefined);

  useEffect(() => {
    setLink(window.location.href);
  }, []);

  return (
    <div className="hidden print:block">
      You can view a fully accessible version of this CV at
      {link && (
        <a href={link} className="text-primary">
          {` `}
          {link}
        </a>
      )}
    </div>
  );
};

export default PrintLink;
