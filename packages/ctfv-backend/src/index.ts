import { drizzle } from "drizzle-orm/d1";
import { Context, Hono } from "hono";
import { cors } from "hono/cors";
import { JwtVariables } from "hono/jwt";
import { logger } from "hono/logger";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'

import { Bindings } from "../env";
import * as schema from "./db/schema";
import challengesRouter from "./routes/challenges";
import userRouter from "./routes/user";

type Variables = JwtVariables;

const app = new OpenAPIHono<{ Bindings: Bindings; Variables: Variables }>();

app.use(
  "*",
  cors({
    origin: (origin) => origin,
    credentials: true,
  })
);

app.use(logger());

app.get('/ui', swaggerUI({ url: '/doc' }));

app.doc('/doc', {
  info: {
    title: 'My API',
    version: 'v1',
  },
  openapi: '3.1.0',
});
app.get('/ui', swaggerUI({ url: '/doc' }))

app.route("api/users", userRouter);
app.route("api/challenges", challengesRouter);

export const getDB = (c: Context) => drizzle(c.env.DATABASE, { schema });

export default app;
