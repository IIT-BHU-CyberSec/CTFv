import bcrypt from "bcryptjs";
import { eq, or } from "drizzle-orm";
import { Hono } from "hono";
import { JwtVariables, sign } from "hono/jwt";

import { getDB } from "..";
import { Bindings } from "../../env";
import * as schema from "../db/schema";
import { authMiddleware } from "../middlewares/auth";

type Variables = JwtVariables;

const userRouter = new Hono<{ Bindings: Bindings; Variables: Variables }>();

function isValidEmail(email: string) {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}

userRouter.post("/auth/register", async (c) => {
  try {
    const db = getDB(c);
    const { email, password, username, isAdmin } = await c.req.json();

    // TODO: Remove isAdmin from the registration form
    if (typeof isAdmin !== "boolean") {
      return c.json({ error: "isAdmin must be boolean" }, 400);
    }
    const correctedEmail = email.toLowerCase();

    const existingUser = await db.query.users.findFirst({
      where: eq(schema.users.email, correctedEmail),
    });

    if (existingUser) {
      return c.json({ error: "User already exists" }, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db
      .insert(schema.users)
      .values({
        email:correctedEmail,
        password: hashedPassword,
        username,
        isAdmin,
      })
      .returning()
      .get();

    // Check if AUTH_SECRET is defined
    if (!c.env.AUTH_SECRET) {
      console.error("AUTH_SECRET is not defined in the environment");
      return c.json({ error: "Internal server error" }, 500);
    }

    const token = await sign(
      { userId: newUser.id, isAdmin: newUser.isAdmin },
      c.env.AUTH_SECRET,
    );

    return c.json({
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
    return c.json({ error: "Internal server error" }, 500);
  }
});

userRouter.post("/auth/login", async (c) => {
  const db = getDB(c);
  const { password, emailOrUsername } = await c.req.json();

  if(isValidEmail(emailOrUsername)){
    const correctedEmail = emailOrUsername.toLowerCase();
    const user = await db.query.users.findFirst({
      where: eq(schema.users.email, correctedEmail),
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return c.json({ error: "Invalid credentials" }, 401);
    }
  
    const token = await sign(
      { userId: user.id, isAdmin: user.isAdmin },
      c.env.AUTH_SECRET,
    );
  
    return c.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
      },
    });
  }else{
    const user = await db.query.users.findFirst({
      where: eq(schema.users.username, emailOrUsername)
    });
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return c.json({ error: "Invalid credentials" }, 401);
    }
  
    const token = await sign(
      { userId: user.id, isAdmin: user.isAdmin },
      c.env.AUTH_SECRET,
    );
  
    return c.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
      },
    });
  }

  
});

userRouter.get("/", async (c) => {
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
});

// Get user profile
userRouter.get("/:id", authMiddleware, async (c) => {
  const db = getDB(c);
  const userId = c.req.param("id");
  const user = await db.query.users.findFirst({
    where: eq(schema.users.id, userId),
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

  if (!user) {
    return c.json({ error: "User not found" }, 404);
  }

  return c.json(user);
});

// Update user profile
userRouter.put("/:id", authMiddleware, async (c) => {
  const db = getDB(c);
  const userId = c.req.param("id");
  const { rollNo, instituteName, website, affiliation, country } =
    await c.req.json();

  if (userId !== c.get("jwtPayload").userId) {
    return c.json({ error: "Unauthorized" }, 403);
  }

  const updatedUser = await db
    .update(schema.users)
    .set({ rollNo, instituteName, website, affiliation, country })
    .where(eq(schema.users.id, userId))
    .returning({
      id: schema.users.id,
      username: schema.users.username,
      email: schema.users.email,
      rollNo: schema.users.rollNo,
      instituteName: schema.users.instituteName,
      website: schema.users.website,
      affiliation: schema.users.affiliation,
      country: schema.users.country,
    });

  return c.json(updatedUser[0]);
});

export default userRouter;
