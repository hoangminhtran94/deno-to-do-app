import { Context, Next } from "https://deno.land/x/oak/mod.ts";

const corsHandler = async (ctx: Context, next: Next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set("Access-Control-Allow-Method", "*");
  ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  await next();
};

export default corsHandler;
