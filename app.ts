import { Application } from "https://deno.land/x/oak/mod.ts";
import mongoose from "npm:mongoose@^6.7";
import todosRoutes from "./routes/todos.ts";
import corsHandler from "./middleware/cors.ts";
const app = new Application();

app.use(corsHandler);

app.use(todosRoutes.routes());
app.use(todosRoutes.allowedMethods());
await mongoose.connect(
  "mongodb://admin:admin@localhost:27018/todo?authSource=admin&directConnection=true"
);

await app.listen({ port: 3000 });
