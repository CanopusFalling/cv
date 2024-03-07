"use server";

import User from "app/(auth)/User";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export interface AuthenticationResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export async function handleLogin(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const sessionToken = await generateSession(username, password);
}

export async function generateSession(
  username: string,
  password: string
): Promise<AuthenticationResponse> {
  const user = await User.fetchUserByUsername(username);
  if (user == null) {
    return { success: false, message: "Username Not Found" };
  }

  if (user.verifyPassword(password)) {
    //Generate a session here
    cookies().set("session_token", "test_token");
    redirect("/");
  }

  return { success: false, message: "Password Incorrect" };
}
