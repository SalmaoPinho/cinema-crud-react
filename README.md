# 🎬 Cinema CRUD React

Sistema completo de gerenciamento de cinema desenvolvido com React, TypeScript, Node.js e Prisma.

![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express-4.21.2-lightgrey)
![Prisma](https://img.shields.io/badge/Prisma-5.22.0-2D3748)

## 📋 Sobre o Projeto

Sistema web para gerenciamento completo de cinema, incluindo:
- 🎥 Cadastro e gerenciamento de filmes
- 🪑 Gerenciamento de salas de cinema
- 🎫 Controle de sessões e horários
- 💳 Venda de ingressos
- 🍿 Gestão de lanches/bomboniere
- 👥 Sistema de autenticação (Admin/Cliente)

## 🚀 Tecnologias

### Frontend
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **React Router DOM** - Roteamento
- **React Query** - Gerenciamento de estado e cache
- **Zod** - Validação de dados
- **Bootstrap 5** - Estilização

### Backend
- **Node.js** - Runtime
- **Express** - Framework web
- **TypeScript** - Tipagem estática
- **Prisma** - ORM
- **SQLite** - Banco de dados (dev)
- **JWT** - Autenticação
- **Bcrypt** - Hash de senhas

## 📁 Estrutura do Projeto

```
cinema-crud-react/
├── frontend/              # Aplicação React
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── config/        # Configurações (API, constantes)
│   │   ├── contexts/      # Contextos React
│   │   ├── hooks/         # Custom hooks (React Query)
│   │   ├── models/        # Tipos e schemas
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── routes/        # Constantes de rotas
│   │   ├── services/      # Serviços de API
│   │   └── utils/         # Funções utilitárias
│   └── package.json
│
├── backend/               # API Node.js
│   ├── src/
│   │   ├── routes/        # Rotas da API
│   │   ├── middlewares/   # Middlewares Express
│   │   ├── app.ts         # Configuração Express
│   │   └── server.ts      # Entry point
│   ├── prisma/
│   │   └── schema.prisma  # Schema do banco
│   └── package.json
│
└── package.json           # Scripts raiz
```

## 🛠️ Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Passo 1: Clonar o repositório
```bash
git clone https://github.com/seu-usuario/cinema-crud-react.git
cd cinema-crud-react
```

### Passo 2: Instalar dependências
```bash
# Instalar dependências da raiz
npm install

# Instalar dependências do frontend
cd frontend
npm install

# Instalar dependências do backend
cd ../backend
npm install
cd ..
```

### Passo 3: Configurar banco de dados
```bash
cd backend

# Gerar Prisma Client
npx prisma generate

# Criar banco de dados e tabelas
npx prisma migrate dev --name init

cd ..
```

### Passo 4: Configurar variáveis de ambiente

O arquivo `.env` já está configurado em `backend/.env` com valores padrão:
```env
NODE_ENV=development
PORT=4000
DATABASE_URL="file:./dev.db"
JWT_SECRET=seu_secret_super_secreto_aqui_mude_em_producao
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

## ▶️ Executar o Projeto

### ⚡ Método Mais Rápido (Windows)

**Execute tudo com um único comando:**
```bash
run.bat
```

Este script faz TUDO automaticamente:
1. ✅ Verifica se já está instalado
2. ✅ Instala dependências (se necessário)
3. ✅ Configura banco de dados (se necessário)
4. ✅ Inicia frontend + backend

**Na primeira vez:** Instala tudo e inicia
**Nas próximas vezes:** Apenas inicia (pula instalação)

---

### 🚀 Scripts Individuais (Windows)

Se preferir executar cada etapa separadamente:

#### 1. Instalação Completa:
```bash
install.bat
```
Instala todas as dependências e configura o banco de dados automaticamente.

#### 2. Iniciar Aplicação:
```bash
start.bat
```
Inicia frontend + backend com um clique.

#### 3. Configurar Banco de Dados:
```bash
setup-db.bat
```
Gera Prisma Client e executa migrations.

#### 4. Abrir Prisma Studio:
```bash
prisma-studio.bat
```
Interface visual para gerenciar o banco de dados.

#### 5. Limpar Projeto:
```bash
clean.bat
```
Remove node_modules, dist e banco de dados.

---

### 📝 Método Manual

#### Rodar tudo com um comando:
```bash
npm run dev
```

Isso iniciará:
- ✅ Backend em `http://localhost:4000`
- ✅ Frontend em `http://localhost:5173`

### Comandos alternativos:

```bash
# Apenas backend
cd backend && npm run dev

# Apenas frontend
cd frontend && npm run dev:front
```

## 📡 API Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login (retorna JWT)

### Filmes
- `GET /api/filmes` - Listar filmes
- `GET /api/filmes/:id` - Buscar filme
- `POST /api/filmes` - Criar filme
- `PUT /api/filmes/:id` - Atualizar filme
- `DELETE /api/filmes/:id` - Deletar filme

### Salas
- `GET /api/salas` - Listar salas
- `POST /api/salas` - Criar sala
- `PUT /api/salas/:id` - Atualizar sala
- `DELETE /api/salas/:id` - Deletar sala

### Sessões
- `GET /api/sessoes` - Listar sessões
- `POST /api/sessoes` - Criar sessão
- `PUT /api/sessoes/:id` - Atualizar sessão
- `DELETE /api/sessoes/:id` - Deletar sessão

### Ingressos
- `GET /api/ingressos` - Listar ingressos
- `POST /api/ingressos` - Criar ingresso
- `PUT /api/ingressos/:id` - Atualizar ingresso
- `DELETE /api/ingressos/:id` - Deletar ingresso

### Lanches
- `GET /api/lanches` - Listar lanches
- `POST /api/lanches` - Criar lanche
- `PUT /api/lanches/:id` - Atualizar lanche
- `DELETE /api/lanches/:id` - Deletar lanche

## 🔐 Autenticação

Rotas protegidas requerem token JWT no header:
```
Authorization: Bearer <seu_token_jwt>
```

### Exemplo de Login:
```javascript
POST /api/auth/login
{
  "username": "admin",
  "senha": "senha123"
}

// Resposta:
{
  "user": {
    "id": "uuid",
    "username": "admin",
    "role": "ADMIN"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 🎨 Funcionalidades

### Para Administradores
- ✅ Gerenciar filmes (CRUD completo)
- ✅ Gerenciar salas (CRUD completo)
- ✅ Criar e gerenciar sessões
- ✅ Visualizar vendas de ingressos
- ✅ Gerenciar lanches/bomboniere

### Para Clientes
- ✅ Visualizar filmes em cartaz
- ✅ Consultar sessões disponíveis
- ✅ Comprar ingressos
- ✅ Adicionar lanches ao pedido

## 🏗️ Arquitetura

### Frontend
- **React Query** - Cache e gerenciamento de estado assíncrono
- **Custom Hooks** - Lógica reutilizável para cada entidade
- **BaseService** - Classe genérica para requisições HTTP
- **Error Boundary** - Tratamento global de erros
- **Toast Notifications** - Feedback visual ao usuário

### Backend
- **Prisma ORM** - Type-safe database access
- **JWT Authentication** - Autenticação stateless
- **Express Middleware** - CORS, error handling
- **RESTful API** - Endpoints padronizados

## 📊 Banco de Dados

### Modelos Principais:
- **Usuario** - Usuários do sistema (admin/cliente)
- **Filme** - Catálogo de filmes
- **Sala** - Salas de cinema
- **Sessao** - Sessões/horários de exibição
- **Ingresso** - Ingressos vendidos
- **Lanche** - Produtos da bomboniere

### Relacionamentos:
- Sessão → Filme (N:1)
- Sessão → Sala (N:1)
- Ingresso → Sessão (N:1)
- Ingresso → Usuario (N:1)

## 🧪 Testes

```bash
# Frontend
cd frontend
npm run lint

# Backend
cd backend
npm run build
```

## 📝 Scripts Disponíveis

### Raiz do projeto:
- `npm run dev` - Rodar frontend + backend
- `npm run dev:frontend` - Apenas frontend
- `npm run dev:backend` - Apenas backend
- `npm run install:all` - Instalar todas as dependências

### Backend:
- `npm run dev` - Desenvolvimento com hot reload
- `npm run build` - Build para produção
- `npm start` - Rodar produção
- `npm run prisma:generate` - Gerar Prisma Client
- `npm run prisma:migrate` - Rodar migrations
- `npm run prisma:studio` - Abrir Prisma Studio

### Frontend:
- `npm run dev:front` - Desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview da build

## 🐛 Troubleshooting

### Porta 4000 já em uso
```bash
# Mude a porta no backend/.env
PORT=4001
```

### Erro "prisma not found"
```bash
cd backend
npm install
npx prisma generate
```

### Erro de CORS
Verifique se `FRONTEND_URL` no `backend/.env` está correto.

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

## 👨‍💻 Autor

Desenvolvido como projeto de estudo de React, TypeScript e Node.js.

---

⭐ Se este projeto foi útil, considere dar uma estrela!
