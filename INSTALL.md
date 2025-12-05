# 🚀 Guia de Instalação - Cinema CRUD

## 📦 Passo 1: Instalar Dependências

### Na raiz do projeto:
```bash
npm install
```

### Instalar backend:
```bash
cd backend
npm install
cd ..
```

## 🗄️ Passo 2: Configurar Banco de Dados

```bash
cd backend

# Gerar Prisma Client
npx prisma generate

# Criar banco de dados e tabelas
npx prisma migrate dev --name init

# Voltar para raiz
cd ..
```

## ▶️ Passo 3: Rodar Aplicação

### Rodar tudo (frontend + backend) com um comando:
```bash
npm run dev
```

Isso vai iniciar:
- ✅ Backend na porta 4000 (http://localhost:4000)
- ✅ Frontend na porta 5173 (http://localhost:5173)

---

## 🔧 Comandos Alternativos

### Rodar apenas backend:
```bash
cd backend
npm run dev
```

### Rodar apenas frontend:
```bash
cd frontend
npm run dev:front
```

---

## ✅ Verificar se está funcionando

1. Backend: http://localhost:4000/health
2. Frontend: http://localhost:5173

---

## 🐛 Problemas Comuns

### Erro "prisma not found":
```bash
cd backend
npm install
npx prisma generate
```

### Porta 4000 já em uso:
- Pare o json-server antigo
- Ou mude a porta no `backend/.env`

### Erro de CORS:
- Verifique se `FRONTEND_URL` no `backend/.env` está correto
