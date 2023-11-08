import express from 'express';
import passport from 'passport';
import { loginUser } from '../controllers/login.controller';

const router = express.Router();


router.post('/login', passport.authenticate('local', { session: false }), loginUser);


export default router;
