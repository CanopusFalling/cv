//@ts-expect-error
import { getRequestContext } from "@cloudflare/next-on-pages";

export default function Page() {
  const { env } = getRequestContext();
  const mainDB = env.MAIN_DB;
  console.log(mainDB);
}
