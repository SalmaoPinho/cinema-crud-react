import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();
const prisma = new PrismaClient();

// POST /api/auth/register - Registrar novo usuário
router.post('/register', async (req, res, next) => {
    try {
        const { username, email, senha, role } = req.body;

        // Verificar se usuário já existe
        const existingUser = await prisma.usuario.findFirst({
            where: { OR: [{ username }, { email }] }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Usuário ou email já existe' });
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Criar usuário
        const user = await prisma.usuario.create({
            data: {
                username,
                email,
                senha: hashedPassword,
                role: role || 'CLIENTE'
            }
        });

        // Gerar token
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );

        res.status(201).json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            token
        });
    } catch (error) {
        next(error);
    }
});

// POST /api/auth/login - Login
router.post('/login', async (req, res, next) => {
    try {
        const { username, senha } = req.body;

        // Buscar usuário
        const user = await prisma.usuario.findUnique({
            where: { username }
        });

        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Verificar senha
        const isValid = await bcrypt.compare(senha, user.senha);

        if (!isValid) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Gerar token
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );

        res.json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            token
        });
    } catch (error) {
        next(error);
    }
});

export default router;
