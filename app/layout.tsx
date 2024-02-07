import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className="bg-neutral-200 dark:bg-neutral-800 h-full text-black dark:text-white"
    >
      <body>
        <main className="max-w-3xl mx-auto m-6 p-4 rounded-lg shadow-2xl dark:shadow-neutral-600 dark:shadow-lg">
          {children}
        </main>
      </body>
    </html>
  );
}
