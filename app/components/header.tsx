"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
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
      className={`print:hidden bg-primary flex-row ${
        isHeaderOpen ? "flex" : "hidden"
      }`}
    >
      <div className="p-2 flex flex-row justify-center gap-4 m-auto">
        <Link
          href={"https://github.com/CanopusFalling/cv"}
          className="underline"
        >
          View the open source code for this website
        </Link>
        |
        <Link href={"https://canopusfalling.co.uk/"} className="underline">
          Check out my other projects
        </Link>
      </div>
      <button
        className="font-bold m-2"
        aria-label="close header"
        onClick={closeHeader}
      >
        X
      </button>
    </header>
  );
}
