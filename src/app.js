
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import sessionRouter from './routes/sessions.router.js';
import './config/passport.js'; 

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use('/api/sessions', sessionRouter);

mongoose.connect('mongodb://localhost:27017/ecommerce'); 

app.listen(8080, () => console.log('Servidor corriendo en puerto 8080'));
