import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import filmesRouter from './routes/filmes.routes.js';
import salasRouter from './routes/salas.routes.js';
import sessoesRouter from './routes/sessoes.routes.js';
import ingressosRouter from './routes/ingressos.routes.js';
import lanchesRouter from './routes/lanches.routes.js';
import authRouter from './routes/auth.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Cinema API is running' });
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/filmes', filmesRouter);
app.use('/api/salas', salasRouter);
app.use('/api/sessoes', sessoesRouter);
app.use('/api/ingressos', ingressosRouter);
app.use('/api/lanches', lanchesRouter);

// Error handling
app.use(errorHandler);

export default app;
