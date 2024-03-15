import auth from "app/(auth)/auth";

import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const user = await auth();

  if (user == null) {
    redirect("/login");
    return <p>Access Denied</p>;
  }

  return children;
}
