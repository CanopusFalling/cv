"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const HEADER_CLOSED_STORAGE_NAME = "headerClosed";

export default function BannerNotification() {
  // Close banner by default.
  const [isHeaderClosed, setIsHeaderClosed] = useState(true);

  // Opens banner only if it hasn't previously been closed.
  useEffect(() => {
    const storedPreference = localStorage.getItem(HEADER_CLOSED_STORAGE_NAME);
    if (storedPreference !== "true") {
      setIsHeaderClosed(false);
    }
  }, []);

  function closeHeader() {
    setIsHeaderClosed(true);
    localStorage.setItem(HEADER_CLOSED_STORAGE_NAME, "true");
  }

  return (
    <header
      className={`print:hidden bg-primary text-white flex-row ${
        isHeaderClosed ? "hidden" : "flex"
      }`}
    >
      <div className="p-2 flex flex-col lg:flex-row lg:gap-4 justify-center text-center m-auto">
        <Link
          href={"https://github.com/CanopusFalling/cv"}
          className="underline"
        >
          View the open source code for this website
        </Link>
        <div className="hidden lg:flex">|</div>
        <Link href={"https://canopusfalling.co.uk/"} className="underline">
          Check out my other projects
        </Link>
      </div>
      <button
        className="font-bold p-2 px-5 text-md"
        aria-label="close header"
        onClick={closeHeader}
      >
        X
      </button>
    </header>
  );
}
