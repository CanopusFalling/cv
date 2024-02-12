import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Samuel Kent - CV",
  description: "CV for Samuel Kent detailing experience and qualifications.",
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
      className="bg-neutral-200 dark:bg-neutral-800 h-full text-black dark:text-white print:p-0 print:m-0"
    >
      <body>
        <main className="max-w-3xl mx-auto m-6 p-4 rounded-lg shadow-2xl dark:shadow-neutral-600 dark:shadow-lg print:bg-none print:m-0 print:p-0 print:shadow-none">
          {children}
        </main>
      </body>
    </html>
  );
}
