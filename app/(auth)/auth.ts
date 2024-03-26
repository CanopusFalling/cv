"use server";

import User from "app/(auth)/User";
import Session from "app/(auth)/Session";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function auth(): Promise<User | null> {
  const sessionToken = cookies().get("session_token").value;
  if (!sessionToken) {
    return null;
  }

  const user = await Session.verifyToken(sessionToken);

  if (!user) {
    return null;
  }

  return user;
}

export async function authGuard() {
  const user = auth();

  if (user == null) {
    redirect("/login");
  }
}
