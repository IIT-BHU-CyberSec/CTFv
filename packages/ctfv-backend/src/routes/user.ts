import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { JwtVariables, sign } from "hono/jwt";
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'

import { getDB } from "..";
import { Bindings } from "../../env";
import * as schema from "../db/schema";
import { authMiddleware } from "../middlewares/auth";

type Variables = JwtVariables;

const userRouter = new OpenAPIHono<{ Bindings: Bindings; Variables: Variables }>();

userRouter.openapi(
  createRoute({
    method: 'post',
    path: '/auth/register',
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({
              email: z.string().email(),
              password: z.string(),
              username: z.string(),
              isAdmin: z.boolean().optional(),
            }),
          },
        },
      }
    },
    responses: {
      200: {
        description: 'User registration success',
        content: {
          'application/json': {
            schema: z.object({
              message: z.string(),
              token: z.string(),
              user: z.object({
                id: z.string(),
                email: z.string(),
                username: z.string(),
                isAdmin: z.boolean(),
              }),
            }),
          },
        },
      },
      400: {
        description: 'Bad request',
        content: {
          'application/json': {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
      },
      500: {
        description: 'Internal server error',
        content: {
          'application/json': {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
      },
    },
  }),
  async (c) => {
    try {
      const db = getDB(c);
      const { email, password, username, isAdmin } = await c.req.json();
  
      if (typeof isAdmin !== "boolean") {
        return c.json({ message: "ERROR: isAdmin must be boolean" }, 400);
      }
  
      const existingUser = await db.query.users.findFirst({
        where: eq(schema.users.email, email),
      });
  
      if (existingUser) {
        return c.json({ message: "ERROR: User already exists" }, 400);
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await db
        .insert(schema.users)
        .values({
          email,
          password: hashedPassword,
          username,
          isAdmin,
        })
        .returning()
        .get();
  
      if (!c.env.AUTH_SECRET) {
        console.error("AUTH_SECRET is not defined");
        return c.json({ message: "ERROR: Internal server error" }, 500);
      }
  
      const token = await sign({ userId: newUser.id }, c.env.AUTH_SECRET);
  
      return c.json({
        message: "User registered successfully",
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
          isAdmin: newUser.isAdmin,
        },
      });
    } catch (error) {
      console.error("Error in /api/auth/register:", error);
      return c.json({ message: "ERROR: Internal server error" }, 500);
    }
  }
);

// OpenAPI for user login
userRouter.openapi(
  createRoute({
    method: 'post',
    path: '/auth/login',
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({
              email: z.string().email(),
              password: z.string(),
            }),
          },
        },
      }
    },
    responses: {
      200: {
        description: 'User login success',
        content: {
          'application/json': {
            schema: z.object({
              message: z.string(),
              token: z.string(),
              user: z.object({
                id: z.string(),
                email: z.string(),
                username: z.string(),
                isAdmin: z.boolean(),
              }),
            }),
          },
        },
      },
      401: {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
      },
    },
  }),
  async (c) => {
    const db = getDB(c);
    const { email, password } = await c.req.json();
  
    const user = await db.query.users.findFirst({
      where: eq(schema.users.email, email),
    });
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return c.json({ message: "ERROR: Invalid credentials" }, 401);
    }
  
    const token = await sign({ userId: user.id }, c.env.AUTH_SECRET);
  
    return c.json({
      message: "User logged in successfully",
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
      },
    });
  }
);

// OpenAPI for fetching all users
userRouter.openapi(
  createRoute({
    method: 'get',
    path: '/',
    responses: {
      200: {
        description: 'Get all users',
        content: {
          'application/json': {
            schema: z.array(
              z.object({
                id: z.string(),
                username: z.string(),
                email: z.string(),
                rollNo: z.string().nullable(),
                instituteName: z.string().nullable(),
                website: z.string().nullable(),
                affiliation: z.string().nullable(),
                country: z.string().nullable(),
                isAdmin: z.boolean(),
              })
            ),
          },
        },
      },
    },
  }),
  async (c) => {
    const db = getDB(c);
    const users = await db.query.users.findMany({
      columns: {
        id: true,
        username: true,
        email: true,
        rollNo: true,
        instituteName: true,
        website: true,
        affiliation: true,
        country: true,
        isAdmin: true,
      },
    });

    return c.json(users);
  }
);

export default userRouter;
