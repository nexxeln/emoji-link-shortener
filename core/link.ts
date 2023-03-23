import { nanoid } from "nanoid";

import { db, type Link } from "./db";
import { getEmojiString } from "./emoji/emoji";

// checkLink
// takes a slug and returns a boolean
// function param should be Pick<Link, "slug">
export async function checkLink({
  slug,
}: Pick<Link, "slug">): Promise<boolean> {
  const { rows } = await db.execute("select * from `Link` where `slug` = ?", [
    slug,
  ]);

  return !!rows.length;
}

// createLink
// takes a url and returns a slug and stores it in the database
// function param should be Pick<Link, "url">
export async function createLink({ url }: Pick<Link, "url">): Promise<string> {
  const slug = getEmojiString(4);

  if (await checkLink({ slug })) {
    return createLink({ url });
  }

  const mysqlDate = new Date().toISOString().slice(0, 19).replace("T", " ");

  await db.execute(
    "insert into `Link` (`id`, `createdAt`, `slug`, `url`) values (?, ?, ?, ?)",
    [nanoid(), mysqlDate, slug, url]
  );

  return slug;
}

// getLink
// takes a slug and returns a url
// function param should be Pick<Link, "slug">
export async function getLink({
  slug,
}: Pick<Link, "slug">): Promise<string | null> {
  const { rows: queriedRows } = await db.execute(
    "select * from `Link` where `slug` = ?",
    [slug]
  );

  const rows = queriedRows as Link[];

  return rows.length ? rows[0].url : null;
}
