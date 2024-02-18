"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function BannerNotification() {
  const [isHeaderOpen, setIsHeaderOpen] = useState(true);

  useEffect(() => {
    const storedPreference = localStorage.getItem("headerOpen");
    console.log(storedPreference);
    if (storedPreference === "false") {
      setIsHeaderOpen(false);
    }
  }, []);

  function closeHeader() {
    setIsHeaderOpen(false);
    localStorage.setItem("headerOpen", "false");
  }

  return (
    <header
      className={`print:hidden bg-primary text-white flex-row ${
        isHeaderOpen ? "flex" : "hidden"
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
