import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mt-2">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-md font-bold mt-2">{children}</h4>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-blue-800 dark:text-blue-400 hover:underline visited:text-purple-600 visited:dark:text-purple-400 break-inside-avoid"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => <ul className="list-disc pl-5 mb-4">{children}</ul>,
    li: ({ children }) => (
      <li className="mb-1 break-inside-avoid">{children}</li>
    ),
    p: ({ children }) => <p className="break-inside-avoid">{children}</p>,
    hr: ({ children }) => (
      <hr className="my-3 border-neutral-400 dark:border-neutral-600 print:border-black print:block">
        {children}
      </hr>
    ),
    ...components,
  };
}
