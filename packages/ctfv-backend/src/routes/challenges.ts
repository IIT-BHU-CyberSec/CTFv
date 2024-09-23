import { and, eq, sql } from "drizzle-orm";
import { Hono } from "hono";
import { JwtVariables, sign } from "hono/jwt";

import { getDB } from "..";
import { Bindings } from "../../env";
import * as schema from "../db/schema";
import { adminMiddleware } from "../middlewares/admin";
import { authMiddleware } from "../middlewares/auth";

type Variables = JwtVariables;

const challengesRouter = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();

challengesRouter.post("/create", authMiddleware, adminMiddleware, async (c) => {
  try {
    const db = getDB(c);
    const { name, description, url, points, author, category, flag } =
      await c.req.json();
    const newChallenge = await db
      .insert(schema.challenges)
      .values({
        name,
        url,
        points,
        author,
        category,
        description,
        flag,
      })
      .returning()
      .get();

    return c.json(newChallenge);
  } catch (e) {
    return c.json({
      error: (e as Error).message,
    });
  }
});

challengesRouter.get("/read", authMiddleware, async (c) => {
  try {
    const db = getDB(c);
    const userId = c.get("jwtPayload").userId;

    const allChallenges = await db.select().from(schema.challenges);
    const solvedChallenges = await db
      .select({ challengeId: schema.submissions.challengeId })
      .from(schema.submissions)
      .where(
        and(
          eq(schema.submissions.userId, userId),
          eq(schema.submissions.isCorrect, true),
        ),
      );

    const solvedChallengeIds = new Set(
      solvedChallenges.map((c) => c.challengeId),
    );

    const groupedChallenges = allChallenges.reduce(
      (acc, challenge) => {
        if (!acc[challenge.category]) {
          acc[challenge.category] = [];
        }
        acc[challenge.category].push({
          id: challenge.id,
          name: challenge.name,
          description: challenge.description,
          url: challenge.url,
          points: challenge.points,
          author: challenge.author,
          flag: c.get("jwtPayload").isAdmin ? challenge.flag : null,
          solved: solvedChallengeIds.has(challenge.id),
        });
        return acc;
      },
      {} as Record<string, any>,
    );

    const response = {
      challenges: Object.entries(groupedChallenges).map(
        ([category, challenges]) => ({
          category,
          challenges,
        }),
      ),
    };

    return c.json(response);
  } catch (e) {
    return c.json({
      error: (e as Error).message,
    });
  }
});

challengesRouter.put(
  "/update/:id",
  authMiddleware,
  adminMiddleware,
  async (c) => {
    try {
      const db = getDB(c);
      const { name, description, url, points, author, category } =
        await c.req.json();
      const challengeId = c.req.param("id");
      const updatedChallenge = await db
        .update(schema.challenges)
        .set({ name, description, url, points, author, category })
        .where(eq(schema.challenges.id, challengeId))
        .returning({
          id: schema.challenges.id,
          name: schema.challenges.name,
          description: schema.challenges.description,
          url: schema.challenges.url,
          points: schema.challenges.points,
          author: schema.challenges.author,
          category: schema.challenges.category,
          flag: schema.challenges.flag,
        });

      if (!updatedChallenge) {
        return c.json({
          error: "challenge not found",
        });
      }

      return c.json(updatedChallenge[0]);
    } catch (e) {
      return c.json({
        error: (e as Error).message,
      });
    }
  },
);

challengesRouter.delete(
  "/delete/:id",
  authMiddleware,
  adminMiddleware,
  async (c) => {
    try {
      const db = getDB(c);
      const challengeId = c.req.param("id");
      const deletedChallenge = await db
        .delete(schema.challenges)
        .where(eq(schema.challenges.id, challengeId))
        .returning()
        .get();

      if (!deletedChallenge) {
        return c.json({ error: "Challenge not found" });
      }

      return c.json(deletedChallenge);
    } catch (e) {
      return c.json({
        error: (e as Error).message,
      });
    }
  },
);

challengesRouter.post("/submit/:id", authMiddleware, async (c) => {
  try {
    const db = getDB(c);
    const challengeId = c.req.param("id");
    const { flag } = await c.req.json();
    const userId = c.get("jwtPayload").userId;

    const challenge = await db
      .select()
      .from(schema.challenges)
      .where(eq(schema.challenges.id, challengeId))
      .get();

    if (!challenge) {
      return c.json({ error: "Challenge not found" }, 404);
    }

    const submissionCountResult = await db
      .select({
        attemptCount: sql`COUNT(${schema.submissions.id})`.as("attemptCount"),
      })
      .from(schema.submissions)
      .where(
        and(
          eq(schema.submissions.userId, userId),
          eq(schema.submissions.challengeId, challengeId),
        ),
      )
      .get();

    const attemptsMade = (submissionCountResult as { attemptCount: number })?.attemptCount ?? 0;

    if (attemptsMade >= challenge.total_attempts) {
      return c.json({ error: "Maximum attempts reached" }, 403);
    }

    const hasSubmittedCorrectly = await db
      .select()
      .from(schema.submissions)
      .where(
        and(
          eq(schema.submissions.userId, userId),
          eq(schema.submissions.challengeId, challengeId),
          eq(schema.submissions.isCorrect, true),
        ),
      )
      .get();

    if (hasSubmittedCorrectly) {
      return c.json({ error: "Already submitted correct answer" }, 400);
    }

    const isCorrect = challenge.flag === flag;

    const submission = await db
      .insert(schema.submissions)
      .values({
        userId,
        challengeId,
        input: flag,
        isCorrect,
      })
      .returning()
      .get();

    return c.json({
      submission: {
        id: submission.id,
        timestamp: submission.timestamp,
        isCorrect: submission.isCorrect,
      },
    });
  } catch (e) {
    return c.json(
      {
        error: (e as Error).message,
      },
      500,
    );
  }
});

challengesRouter.get("/submissions", authMiddleware, async (c) => {
  try {
    const db = getDB(c);
    const isAdmin = c.get("jwtPayload").isAdmin;
    const userId = c.get("jwtPayload").userId;

    const submissions = await db
      .select({
        id: schema.submissions.id,
        userId: schema.submissions.userId,
        challengeId: schema.submissions.challengeId,
        input: schema.submissions.input,
        timestamp: schema.submissions.timestamp,
        isCorrect: schema.submissions.isCorrect,
      })
      .from(schema.submissions)
      .orderBy(schema.submissions.timestamp);

    if (!isAdmin) {
      const userSubmissions = submissions.filter(
        (submission) => submission.userId === userId,
      );
      return c.json({ submissions: userSubmissions });
    }

    return c.json({ submissions });
  } catch (e) {
    return c.json(
      {
        error: (e as Error).message,
      },
      500,
    );
  }
});

challengesRouter.get("/leaderboard", authMiddleware, async (c) => {
  try {
    const db = getDB(c);
    const leaderboard = await db
      .select({
        userId: schema.submissions.userId,
        username: schema.users.username,
        totalPoints: sql`SUM(${schema.challenges.points})`.as("totalPoints"),
      })
      .from(schema.submissions)
      .innerJoin(
        schema.challenges,
        eq(schema.submissions.challengeId, schema.challenges.id),
      )
      .innerJoin(schema.users, eq(schema.submissions.userId, schema.users.id))
      .where(eq(schema.submissions.isCorrect, true))
      .groupBy(schema.submissions.userId)
      .orderBy(sql`totalPoints DESC`)
      .all();
    return c.json({ leaderboard });
  } catch (e) {
    return c.json({
      error: (e as Error).message,
    });
  }
});

challengesRouter.get("/personal/:id", authMiddleware, async (c) => {
  try {
    const db = getDB(c);
    const id = c.req.param("id");

    const leaderboard = await db
      .select({
        userId: schema.submissions.userId,
        username: schema.users.username,
        totalPoints: sql`SUM(${schema.challenges.points})`.as("totalPoints"),
      })
      .from(schema.submissions)
      .innerJoin(
        schema.challenges,
        eq(schema.submissions.challengeId, schema.challenges.id),
      )
      .innerJoin(schema.users, eq(schema.submissions.userId, schema.users.id))
      .where(eq(schema.submissions.isCorrect, true))
      .groupBy(schema.submissions.userId)
      .orderBy(sql`totalPoints DESC`)
      .all();

    const userRank = leaderboard.findIndex((entry) => entry.userId === id) + 1;
    const userData = leaderboard.find((entry) => entry.userId === id);

    if (!userData) {
      return c.json({ error: "User not found" }, 404);
    }

    const solvedChallenges = await db
      .select({
        challengeId: schema.challenges.id,
        challengeName: schema.challenges.name,
        points: schema.challenges.points,
        solvedTime: schema.submissions.timestamp,
      })
      .from(schema.submissions)
      .innerJoin(
        schema.challenges,
        eq(schema.submissions.challengeId, schema.challenges.id),
      )
      .where(
        and(
          eq(schema.submissions.userId, id),
          eq(schema.submissions.isCorrect, true),
        ),
      )
      .orderBy(schema.submissions.timestamp);

    return c.json({
      rank: userRank,
      username: userData.username,
      totalPoints: userData.totalPoints,
      solvedChallenges,
    });
  } catch (e) {
    return c.json(
      {
        error: (e as Error).message,
      },
      500,
    );
  }
});

export default challengesRouter;
