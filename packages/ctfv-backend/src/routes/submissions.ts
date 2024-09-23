import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { JwtVariables } from "hono/jwt";

import { getDB } from "..";
import { Bindings } from "../../env";
import * as schema from "../db/schema";
import { authMiddleware } from "../middlewares/auth";

type Variables = JwtVariables;

const submissionRouter = new Hono<{
    Bindings: Bindings;
    Variables: Variables;
}>();

submissionRouter.get('/read',authMiddleware , async (c) => {
    try {
      const db = getDB(c);
      const result = await db
        .select({
          username: schema.users.username,
          timestamp: schema.submissions.timestamp,
          challengeName: schema.challenges.name,
          challengeDescription: schema.challenges.description,
          isCorrect: schema.submissions.isCorrect
        })
        .from(schema.submissions)
        .innerJoin(schema.users, eq(schema.submissions.userId, schema.users.id))
        .innerJoin(schema.challenges, eq(schema.submissions.challengeId, schema.challenges.id));
      return c.json(result);
    }catch (e) {
      return c.json({
        success: false,
        error: (e as Error).message
      });
    }
});

submissionRouter.get('/readbyuserid/:id',authMiddleware ,async (c) => {
    try{
        const userId = c.req.param("id");
        const db = getDB(c)
        const result = await db.select({
            username: schema.users.username,
            timestamp: schema.submissions.timestamp,
            challengeName: schema.challenges.name,
            challengeDescription: schema.challenges.description,
            isCorrect: schema.submissions.isCorrect
        }).from(schema.submissions).
        innerJoin(schema.users, eq(schema.submissions.userId, schema.users.id)).
        innerJoin(schema.challenges, eq(schema.submissions.challengeId, schema.challenges.id)).
        where(eq(schema.users.id, userId))

        return c.json(result)
    }catch(e){
        return c.json({error: (e as Error).message})
    }
})

submissionRouter.get('/readbychallengeid/:id', authMiddleware ,async (c) => {
    try{
        const challengeId = c.req.param("id")
        const db = getDB(c)
        const result = await db.select({
            username: schema.users.username,
            timestamp: schema.submissions.timestamp,
            challengeName: schema.challenges.name,
            challengeDescription: schema.challenges.description,
            isCorrect: schema.submissions.isCorrect
        }).from(schema.submissions).
        innerJoin(schema.users, eq(schema.submissions.userId, schema.users.id)).
        innerJoin(schema.challenges, eq(schema.submissions.challengeId, schema.challenges.id)).
        where(eq(schema.challenges.id, challengeId))

        return c.json(result)
    }catch(e){
        return c.json({ error: (e as Error).message })
    }
})


export default submissionRouter;
