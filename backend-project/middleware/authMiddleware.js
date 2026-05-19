const jwt = require("jsonwebtoken");

function isLoggedIn(req, res, next) {
  if (req.user) return next();
  const token = req.cookies.token;
  if (!token) return res.redirect("/login");
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: data.id };
    next();
  } catch {
    return res.redirect("/login");
  }
}

function isLoggedInApi(req, res, next) {
  if (req.user && req.user._id) return next();

  const token = req.cookies.token;
  if (!token) return res.status(401).json({ success: false, loginRequired: true });

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: data.id };
    next();
  } catch {
    return res.status(401).json({ success: false, loginRequired: true });
  }
}

function issueAuthToken(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30m"
  });
}

module.exports = {
  isLoggedIn,
  isLoggedInApi,
  issueAuthToken
};
