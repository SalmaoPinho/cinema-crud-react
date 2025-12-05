import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
    try {
        const lanches = await prisma.lanche.findMany();
        res.json(lanches);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const lanche = await prisma.lanche.findUnique({
            where: { id: req.params.id }
        });
        if (!lanche) return res.status(404).json({ error: 'Lanche não encontrado' });
        res.json(lanche);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const lanche = await prisma.lanche.create({ data: req.body });
        res.status(201).json(lanche);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const lanche = await prisma.lanche.update({
            where: { id: req.params.id },
            data: req.body
        });
        res.json(lanche);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await prisma.lanche.delete({ where: { id: req.params.id } });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router;
