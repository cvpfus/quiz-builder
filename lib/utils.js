import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getUrl(ctx, path) {
  return process.env.NODE_ENV === "development"
    ? `http://localhost:3000${path}`
    : `https://${ctx.req?.headers.host}${path}`;
}
