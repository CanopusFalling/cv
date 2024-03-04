import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export default function Page(request: NextRequest) {
  const { env } = getRequestContext();
  const mainDB = env.MAIN_DB;
  console.log(mainDB);
}
