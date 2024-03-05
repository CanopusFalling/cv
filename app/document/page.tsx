//@ts-expect-error
import { getRequestContext } from "@cloudflare/next-on-pages";
import { drizzle } from "drizzle-orm/d1";

import { document } from "app/schema";

export default async function Page() {
  const { env } = getRequestContext();
  const db = drizzle(env.MAIN_DB as D1Database);
  const result = await db.select().from(document).all();

  return (
    <div>
      {result.map((item) => (
        <div key={item.id}>
          <p>ID: {item.id}</p>
          <p>Name: {item.name}</p>
        </div>
      ))}
    </div>
  );
}
