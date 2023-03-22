import { z } from "zod";

import { redis } from "./redis";
import { getEmojiString } from "./emoji/emoji";

export const LinkSchema = z.object({
  link: z.string().url(),
});

export type Link = z.infer<typeof LinkSchema>;

async function getUniqueSlug(): Promise<string> {
  const slug = getEmojiString(4);

  const didSet = await redis.set(`link/${slug}`, "", { nx: true });

  if (!didSet) {
    return getUniqueSlug();
  }

  return slug;
}

export async function createLink({ link }: Link): Promise<string> {
  const slug = await getUniqueSlug();

  await redis.set(`link/${slug}`, link);

  return slug;
}

export async function getLink(key: string): Promise<string | null> {
  return await redis.get(`link/${key}`);
}
