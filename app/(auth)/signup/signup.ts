"use server";

import User from "app/(auth)/User";

import { redirect } from "next/navigation";

import { z } from "zod";

const schema = z.object({
  username: z.string({
    invalid_type_error: "Invalid Username",
  }),
  password: z.string({
    invalid_type_error: "Invalid Password",
  }),
});

export async function signUp(prevState: any, formData: FormData) {
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

  if ((await User.count()) === 0) {
    User.createUser(username, password);
    redirect("/login");
  }

  return { errors: "signup disabled" };
}
