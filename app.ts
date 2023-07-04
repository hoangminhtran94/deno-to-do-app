import { Application } from "https://deno.land/x/oak/mod.ts";
import mongoose from "npm:mongoose@^6.7";
import TodoEntity from "./entities/TodoEntity.ts";
import todosRoutes from "./routes/todos.ts";

const app = new Application();

app.use(async (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set("Access-Control-Allow-Method", "*");
  ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  await next();
});

app.use(todosRoutes.routes());
app.use(todosRoutes.allowedMethods());
await mongoose.connect(
  "mongodb://admin:admin@localhost:27018/todo?authSource=admin&directConnection=true"
);

await app.listen({ port: 3000 });
