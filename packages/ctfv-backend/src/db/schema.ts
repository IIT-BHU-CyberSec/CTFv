import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("user", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  username: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  rollNo: text("rollNo"),
  instituteName: text("instituteName"),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
});

// Keep other tables (accounts, sessions, verificationTokens, authenticators) as they were