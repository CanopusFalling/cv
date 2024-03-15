"use client";

import { signUp } from "./signup";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {
  message: "",
};

export default function SignUpPage() {
  const usernameID = "username";
  const passwordID = "current-password";

  const [state, formAction] = useFormState(signUp, initialState);

  return (
    <>
      <h1 className="p-4 text-center w-full text-2xl">Sign Up</h1>
      <form
        className="border p-2 flex flex-col gap-3 max-w-md mx-auto"
        action={formAction}
      >
        <section className="flex flex-row gap-2">
          <label htmlFor={usernameID}>Username</label>
          <input
            className="bg-neutral-700 border w-full"
            id={usernameID}
            name="username"
            type="text"
            required
            autoFocus
          />
        </section>
        <section className="flex flex-row gap-2">
          <label htmlFor={passwordID}>Password</label>
          <input
            className="bg-neutral-700 border w-full"
            id={passwordID}
            name="password"
            type="password"
            required
          />
        </section>
        {state && state.errors && (
          <div
            role="alert"
            className=" bg-red-700 bg-opacity-30 border-l-4 border-red-700 p-2"
          >
            {state.errors}
            {state.errors.username}
          </div>
        )}
        <SignUpButton />
      </form>
    </>
  );
}

function SignUpButton() {
  const { pending } = useFormStatus();

  return (
    <button aria-disabled={pending} type="submit">
      Sign Up
    </button>
  );
}
