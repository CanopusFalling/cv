import Link from "next/link";

export default function Header() {
  return (
    <header className="print:hidden p-2 bg-primary flex flex-row justify-center gap-4">
      <Link href={"https://github.com/CanopusFalling/cv"} className="underline">
        View the open source code for this website
      </Link>
      |
      <Link href={"https://canopusfalling.co.uk/"} className="underline">
        Check out my other projects
      </Link>
    </header>
  );
}
