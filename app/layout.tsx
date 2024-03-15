export const runtime = "edge";

import "app/globals.css";
import Footer from "@/components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className="bg-neutral-200 dark:bg-neutral-800 h-full text-black dark:text-white print:p-0 print:m-0 print:bg-white"
    >
      <body className="h-full">
        {children}
        <Footer />
      </body>
    </html>
  );
}
