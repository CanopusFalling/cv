"use server";

import User from "app/(auth)/User";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function login(formData: FormData): Promise<void> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const sessionToken = await generateSession(username, password);
}

export async function generateSession(username: string, password: string) {
  const user = await User.fetchUserByUsername(username);
  if (user == null) {
    return;
  }

  if (user.verifyPassword(password)) {
    //Generate a session here
    cookies().set("session_token", "test_token");
    redirect("/");
  }

  return;
}
