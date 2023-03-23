import { connect } from "@planetscale/database";
import { Link as TLink } from "@prisma/client/edge";

export const db = connect({ url: process.env.DATABASE_URL });

export type Link = TLink;
