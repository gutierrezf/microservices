import UsersService from "#root/adapters/UsersService";

const injectSession = async (req, res, next) => {
  try {
    if (req.cookies.userSessionId) {
      const userSession = await UsersService.fetchUserSession({
        sessionId: req.cookies.userSessionId
      });

      res.locals.userSession = userSession;
    }
  } catch (e) {
    console.warn("failed to fetch session");
  }

  return next();
};

export default injectSession;
