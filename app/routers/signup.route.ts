import * as express from 'express';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import db from '../models/';
const User = db.user;
const router = express.Router();

router.post('/', (req, res, next) => {
  passport.authenticate('local-signup', { session: false }, (err: Error, user: typeof User, info:any) => {
    if (err) {
      return res.status(401).json({ error: 'Authentication error: ' + err.message });
    }
    if (!user) {
      return res.status(401).json({ error: 'the email is already taken'});
    }

    // Authentication successful, generate a JWT token
    const token = jwt.sign({ id: user.id }, 'top-secret', { expiresIn: '1h' });
    return res.json({ token:"Bearer " + token  });
  })(req, res, next);
});

export default router;
