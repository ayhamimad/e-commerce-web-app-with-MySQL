import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import db from '../models';
const User = db.user; // Replace with the actual type you're using for User
const passport = require('passport');

import { jwtConfig } from './jwt.config';

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtConfig.secret,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findOne({ where: { id: jwt_payload.userId } });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);
