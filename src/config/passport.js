import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User.js';
import { isValidPassword } from '../utils/hash.js';

const jwtSecret = 'tu_clave_secreta'; // 🔒 Idealmente usar .env

// Estrategia Local para login
passport.use('login', new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user || !isValidPassword(user, password)) return done(null, false);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Estrategia JWT para rutas protegidas
passport.use('jwt', new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret
}, async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload.id);
    if (!user) return done(null, false);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));
