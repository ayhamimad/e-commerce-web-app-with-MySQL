import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import db from '../models';
const User = db.user; // Replace with the actual type you're using for User
const passport = require('passport');
const bcrypt = require('bcrypt');
import { Strategy as LocalStrategy } from 'passport-local';
import { jwtConfig } from './jwt.config';

const opts: StrategyOptions = {
 jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
 secretOrKey: jwtConfig.secret,
};

passport.use(
 new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findOne({ where: { id: jwt_payload.id } });
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
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
         
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
export default passport;