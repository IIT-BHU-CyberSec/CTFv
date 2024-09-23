import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  username: text("name").notNull().unique(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  rollNo: text("rollNo"),
  instituteName: text("instituteName"),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
  website: text("website"),
  affiliation: text("affiliation"),
  country: text("country"),
  isAdmin: integer("isAdmin", { mode: "boolean" }).notNull().default(false),
});

export const challenges = sqliteTable("challenges", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  description: text("description").notNull(),
  url: text("url").notNull(),
  points: integer("points").notNull(),
  category: text("category", {
    enum: ["reversing", "osint", "pwn", "web", "forensics", "crypto", "stego"],
  }).notNull(),
  author: text("author").notNull(),
  flag: text("flag").notNull(),
  total_attempts: integer("total_attempts").notNull().default(0),
});

export const submissions = sqliteTable("submissions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  challengeId: text("challengeId")
    .notNull()
    .references(() => challenges.id, { onDelete: "cascade" }),
  input: text("input").notNull(),
  timestamp: integer("timestamp", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(current_timestamp)`),
  isCorrect: integer("isCorrect", { mode: "boolean" }).notNull(),
  attemptCount: integer("attemptCount").notNull().default(0),
});
