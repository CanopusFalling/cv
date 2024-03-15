export const runtime = "edge";

import type { Metadata } from "next";
import BannerNotification from "@/components/bannerNotification";
import PrintLink from "@/components/printLink";

export const metadata: Metadata = {
  title: "Samuel Kent - CV",
  description: "CV for Samuel Kent detailing experience and qualifications.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BannerNotification />
      <main className="max-w-4xl mx-auto m-6 p-4 rounded-lg shadow-2xl dark:shadow-neutral-600 dark:shadow-lg print:bg-none print:m-0 print:p-0 print:shadow-none">
        {children}
        <PrintLink />
      </main>
    </>
  );
}
