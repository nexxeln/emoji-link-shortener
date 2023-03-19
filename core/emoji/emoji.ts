import { EMOJIS } from "./emojis";

function getRandomEmoji(): string {
  return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
}

export function getEmojiString(length: number): string {
  return Array.from({ length }, () => getRandomEmoji()).join("");
}
