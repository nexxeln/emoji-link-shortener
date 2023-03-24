import { nanoid } from "nanoid";

import { db, type Link } from "./db";
import { getEmojiString } from "./emoji";

export async function checkLink({
  slug
}: Pick<Link, "slug">): Promise<boolean> {
  const { rows } = await db.execute("select * from `Link` where `slug` = ?", [
    slug
  ]);

  return !!rows.length;
}

export async function createLink({
  url
}: Pick<Link, "url">): Promise<string[]> {
  const slug = getEmojiString(4);

  if (await checkLink({ slug })) {
    return createLink({ url });
  }

  // http://localhost:3000/👧🏽🏠👇🏼🙅🏾
  const urlId = nanoid();
  const mysqlDate = new Date().toISOString().slice(0, 19).replace("T", " ");

  await db.execute(
    "insert into `Link` (`id`, `createdAt`, `slug`, `url`) values (?, ?, ?, ?)",
    [urlId, mysqlDate, slug, url]
  );
  return [urlId, slug];
}

export async function getLink({
  slug
}: Pick<Link, "slug">): Promise<string | null> {
  const { rows: queriedRows } = await db.execute(
    "select * from `Link` where `slug` = ? or `id` = ?",
    [slug, slug]
  );
  const rows = queriedRows as Link[];
  return rows.length ? rows[0].url : null;
}
