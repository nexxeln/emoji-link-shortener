import { z } from "zod";

import { redis } from "./redis";
import { getEmojiString } from "./emoji/emoji";

export const LinkType = z.union([z.literal("emoji"), z.literal("sketchy")]);

export const CreateLinkSchema = z.object({
  link: z.string().url(),
  type: LinkType,
});

export const LinkSchema = CreateLinkSchema.extend({
  clicks: z.number().int().min(0),
});

export type LinkType = z.infer<typeof LinkType>;
export type CreateLink = z.infer<typeof CreateLinkSchema>;
export type Link = z.infer<typeof LinkSchema>;

export async function createLink({ link, type }: CreateLink): Promise<string> {
  let slug = "";

  switch (type) {
    case "emoji":
      const emojiString = getEmojiString(4);

      const didSet = await redis.hsetnx(`link/${emojiString}`, "link", link);

      if (!didSet) {
        return createLink({ link, type });
      }

      slug = emojiString;
  }

  return slug;
}

export async function getLink(key: string): Promise<string | null> {
  return await redis.hget(`link/${key}`, "link");
}

export async function getLinkClicks(key: string): Promise<number | null> {
  return await redis.hget(`link/${key}`, "clicks");
}

export async function incrementLinkClicks(key: string): Promise<void> {
  await redis.hincrby(`link/${key}`, "clicks", 1);
}

export async function getLinkEverything(
  key: string
): Promise<Omit<Link, "type"> | null> {
  return await redis.hgetall(`link/${key}`);
}
