import { Elysia } from "elysia";
import {swagger} from '@elysiajs/swagger';
import userRoutes from "./routes/userRoute";

const app = new Elysia();

app
  .use(swagger())
  .group('/api', (app) => app.use(userRoutes))
  .listen(process.env.PORT || 8080)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
