"use server";

import Session from "app/(auth)/Session";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { z } from "zod";

const schema = z.object({
  username: z.string({
    invalid_type_error: "Invalid Username",
  }),
  password: z.string({
    invalid_type_error: "Invalid Password",
  }),
});

export async function login(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const validatedFields = schema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const session = await Session.generateSession(username, password);

  if (session !== null) {
    cookies().set("session_token", session.token);
    redirect("/dashboard");
  }

  return { errors: "login faliure" };
}
