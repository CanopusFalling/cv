import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-2 flex flex-col lg:flex-row lg:gap-4 justify-center text-center m-auto">
      <Link href={"https://github.com/CanopusFalling/cv"} className="underline">
        Project GitHub
      </Link>
      <div className="hidden lg:flex">|</div>
      <Link href={"https://canopusfalling.co.uk/"} className="underline">
        Other Projects
      </Link>
      <div className="hidden lg:flex">|</div>
      <div>Released Under MIT License</div>
    </footer>
  );
}
