# 🎬 Cinema CRUD - Backend

Backend API para o sistema de gerenciamento de cinema.

## 🚀 Tecnologias

- Node.js + TypeScript
- Express.js
- Prisma ORM
- SQLite (dev) / PostgreSQL (prod)
- JWT Authentication
- Bcrypt

## 📦 Instalação

### Na raiz do projeto:
```bash
npm install
npm run install:all
```

### Apenas backend:
```bash
cd backend
npm install
```

## 🗄️ Database Setup

```bash
cd backend

# Gerar Prisma Client
npx prisma generate

# Criar database e rodar migrations
npx prisma migrate dev --name init

# (Opcional) Abrir Prisma Studio
npx prisma studio
```

## 🏃 Executar

### Rodar tudo (frontend + backend):
```bash
# Na raiz do projeto
npm run dev
```

### Apenas backend:
```bash
cd backend
npm run dev
```

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login

### Filmes
- `GET /api/filmes` - Listar filmes
- `GET /api/filmes/:id` - Buscar filme
- `POST /api/filmes` - Criar filme
- `PUT /api/filmes/:id` - Atualizar filme
- `DELETE /api/filmes/:id` - Deletar filme

### Salas
- `GET /api/salas` - Listar salas
- `GET /api/salas/:id` - Buscar sala
- `POST /api/salas` - Criar sala
- `PUT /api/salas/:id` - Atualizar sala
- `DELETE /api/salas/:id` - Deletar sala

### Sessões
- `GET /api/sessoes` - Listar sessões
- `GET /api/sessoes/:id` - Buscar sessão
- `POST /api/sessoes` - Criar sessão
- `PUT /api/sessoes/:id` - Atualizar sessão
- `DELETE /api/sessoes/:id` - Deletar sessão

### Ingressos
- `GET /api/ingressos` - Listar ingressos
- `GET /api/ingressos/:id` - Buscar ingresso
- `POST /api/ingressos` - Criar ingresso
- `PUT /api/ingressos/:id` - Atualizar ingresso
- `DELETE /api/ingressos/:id` - Deletar ingresso

### Lanches
- `GET /api/lanches` - Listar lanches
- `GET /api/lanches/:id` - Buscar lanche
- `POST /api/lanches` - Criar lanche
- `PUT /api/lanches/:id` - Atualizar lanche
- `DELETE /api/lanches/:id` - Deletar lanche

## 🔐 Autenticação

Rotas protegidas requerem header:
```
Authorization: Bearer <token>
```

## 🌍 Variáveis de Ambiente

Copie `.env.example` para `.env` e configure:

```env
NODE_ENV=development
PORT=4000
DATABASE_URL="file:./dev.db"
JWT_SECRET=seu_secret_aqui
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

## 📝 Scripts

- `npm run dev` - Desenvolvimento com hot reload
- `npm run build` - Build para produção
- `npm start` - Rodar produção
- `npm run prisma:generate` - Gerar Prisma Client
- `npm run prisma:migrate` - Rodar migrations
- `npm run prisma:studio` - Abrir Prisma Studio
