require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

const callbackURL =
  process.env.NODE_ENV === "production"
    ? "https://food-delivery-website-sepia-eight.vercel.app/auth/google/callback"
    : "http://localhost:3000/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      const googlePic = profile.photos?.[0]?.value?.replace("s96-c", "s400-c");

      let user = await User.findOne({ email });

      if (!user) {
        user = await User.create({
          username: profile.displayName,
          email,
          password: "google",
          profilePic: googlePic || "/images/default.png",
        });
      } else {
        user.profilePic = googlePic || user.profilePic;
        await user.save();
      }

      return done(null, user);
    },
  ),
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

module.exports = passport;
