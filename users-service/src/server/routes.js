import { addHours } from "date-fns";

import { User, UserSession } from "#root/db/models";
import generateUUID from "#root/helpers/generateUUID";
import hashPassword from "#root/helpers/hashPassword";
import passwordCompareSync from "#root/helpers/passwordCompareSync";

const USER_SESSION_EXPIRY_HOURS = 1;

const setupRoutes = app => {
  app.post("/sessions", async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      next(new Error("invalid body!"));
    }

    try {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user) return next(new Error("Invalid email"));

      if (!passwordCompareSync(req.body.password, user.passwordHash)) {
        return next(new Error("Invalid password"));
      }

      const expiresAt = addHours(new Date(), USER_SESSION_EXPIRY_HOURS);
      const sessionToken = generateUUID();

      const userSession = await UserSession.create({
        expiresAt,
        id: sessionToken,
        userId: user.id
      });

      res.json(userSession);
    } catch (e) {
      return next(e);
    }
  });

  app.delete("/sessions/:sessionId", async (req, res, next) => {
    try {
      const session = await UserSession.findByPk(req.params.sessionId);

      if (!session) {
        return next(new Error("invalid session ID!"));
      }

      await session.destroy();

      return res.end();
    } catch (e) {
      return next(e);
    }
  });

  app.get("/sessions/:sessionId", async (req, res, next) => {
    try {
      const session = await UserSession.findByPk(req.params.sessionId);

      if (!session) {
        return next(new Error("invalid session ID!"));
      }

      return res.json(session);
    } catch (e) {
      return next(e);
    }
  });

  app.post("/users", async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      next(new Error("invalid body!"));
    }

    try {
      const newUser = await User.create({
        email: req.body.email,
        id: generateUUID(),
        passwordHash: hashPassword(req.body.password)
      });

      return res.json(newUser);
    } catch (e) {
      return next(e);
    }
  });

  app.get("/users/:userId", async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.userId);

      if (!user) {
        return next(new Error("invalid user ID!"));
      }

      return res.json(user);
    } catch (e) {
      return next(e);
    }
  });
};

export default setupRoutes;
