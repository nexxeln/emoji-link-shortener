export const runtime = "nodejs";

import { LinkSchema, createLink } from "~~/core/link";

export async function POST(request: Request) {
  const body = LinkSchema.safeParse(await request.json());

  if (!body.success) {
    return new Response("Invalid body", { status: 400 });
  }

  const slug = encodeURI(await createLink(body.data));

  return new Response("OK", { status: 200, headers: { slug } });
}
