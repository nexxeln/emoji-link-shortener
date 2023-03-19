import { z } from "zod";

import { redis } from "./redis";
import { getEmojiString } from "./emoji/emoji";

export const LinkType = z.union([z.literal("emoji"), z.literal("sketchy")]);

export const LinkSchema = z.object({
  link: z.string().url(),
  type: LinkType,
});

export type LinkType = z.infer<typeof LinkType>;
export type Link = z.infer<typeof LinkSchema>;

export async function createLink({ link, type }: Link): Promise<void> {
  switch (type) {
    case "emoji":
      const emojiString = getEmojiString(4);

      const didSet = await redis.set(`link/${emojiString}`, link, { nx: true });

      if (!didSet) {
        return createLink({ link, type });
      }
  }
}
