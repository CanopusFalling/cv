"use server";

import User from "app/(auth)/User";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { SafeParseError, SafeParseReturnType, z } from 'zod';

const schema = z.object({
  username: z.string({
    invalid_type_error: 'Invalid Username',
  }),
  password: z.string({
    invalid_type_error: "Invalid Password",
  })
})

export async function login(prevState: any, formData: FormData) {
  console.log(formData.get("password"))
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const validatedFields = schema.safeParse({
    username: formData.get('username'),
    password: formData.get("password")
  })

  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }



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
