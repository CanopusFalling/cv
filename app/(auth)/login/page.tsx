import { handleLogin } from "../authentication";

export default function LoginPage() {
  const usernameID = "username";
  const passwordID = "current-password";

  return (
    <>
      <h1 className="p-4 text-center w-full text-2xl">Login</h1>
      <form
        className="border p-2 flex flex-col gap-3 max-w-md mx-auto"
        action={handleLogin}
        method="post"
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
        <button type="submit">Login</button>
      </form>
    </>
  );
}
