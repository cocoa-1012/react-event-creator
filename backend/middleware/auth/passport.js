const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../../models/User');
const passport = require('passport');
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_TOKEN_SECRET;

module.exports = () => {
  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      User.findOne({ where: { username: payload.username } })
        .then((user) => {
          if (!user) {
            return done(null, payload);
          } else {
            return done(null, user);
          }
        })
        .catch((error) => {
          console.log(error, '1rs');
          return done(error);
        });
    })
  );
};
