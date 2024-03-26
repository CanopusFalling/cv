import Document from "app/models/Document";
import { MDXRemote } from "next-mdx-remote/rsc";
import Sidebar from "./sidebar";

export default async function Dashboard() {
  const documents = await Document.getAllDocuments();

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <Sidebar />

      <ul className="w-full max-w-lg divide-y">
        <li></li>
        {documents.map((document) => (
          <li key={document.id}>
            <a href={`#/documents/${document.id}`}>{document.name}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
