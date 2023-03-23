export const runtime = "nodejs";

import { z } from "zod";
import { createLink } from "~~/core/link";

const BodySchema = z.object({
  url: z.string().url(),
});

export async function POST(request: Request) {
  const body = BodySchema.safeParse(await request.json());

  if (!body.success) {
    return new Response("Invalid body", { status: 400 });
  }

  const slug = encodeURI(await createLink(body.data));

  return new Response("OK", { status: 200, headers: { slug } });
}
