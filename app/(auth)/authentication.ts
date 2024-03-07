"use server";

import User from "app/(auth)/User";

export interface Session {
  token: string;
}

export async function handleLogin(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const sessionToken = await generateSession(username, password);
}

export async function generateSession(
  username: string,
  password: string
): Promise<string> {
  console.log(await User.createUser(username, password));
  return "test_token";
}

async function authenticateUser() {}
