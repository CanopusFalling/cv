import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto my-5 flex flex-col gap-2">
      <h1 className="text-4xl">Error 404: Not Found</h1>
      <p>Could not find this page, it could have been deleted or moved.</p>
      <Link
        className="m-2 border border-white border-opacity-40 rounded-xl text-xl mx-auto"
        href="/"
      >
        Return Home
      </Link>
    </div>
  );
}
