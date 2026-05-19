const activityTrackerMiddleware = (req, res, next) => {
  const isLoggedIn = req.user || req.cookies.token;

  if (!isLoggedIn) {
    return next();
  }

  if (!req.session.lastActivity) {
    req.session.lastActivity = Date.now();
  }

  const now = Date.now();
  const diff = now - req.session.lastActivity;

  if (diff > 30 * 60 * 1000) {
    return req.logout(() => {
      req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.clearCookie("token");
        return res.redirect("/login");
      });
    });
  }

  req.session.lastActivity = now;
  next();
};

module.exports = activityTrackerMiddleware;
