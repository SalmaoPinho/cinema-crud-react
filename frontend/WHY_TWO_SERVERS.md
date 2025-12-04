# 🚀 Por que npm run dev não bastava?

## ❓ O Problema

Seu projeto tem **DUAS partes separadas**:

```
┌────────────────────────────────┐
│   Frontend (React + Vite)      │  ← npm run dev rodava APENAS isso
│   http://localhost:5173        │
└────────────────────────────────┘
                ↓
        Precisa de dados ↓
                ↓
┌────────────────────────────────┐
│   Backend/API (JSON Server)    │  ← Não estava rodando!
│   http://localhost:4000        │
└────────────────────────────────┘
```

**Problema:** O código TypeScript tenta buscar dados de `http://localhost:4000/salas`, mas essa API não existia porque só o frontend estava rodando.

---

## ✅ Solução Implementada

Agora o comando `npm run dev` roda **TUDO automaticamente**!

### O que mudou:

#### **Antes:**
```json
"scripts": {
  "dev": "vite"  // ← Só frontend
}
```

#### **Depois:**
```json
"scripts": {
  "dev": "concurrently \"npm run server\" \"vite\"",  // ← Frontend + Backend
  "dev:front": "vite",                                  // ← Só frontend
  "dev:back": "json-server --watch ./db.json --port 4000", // ← Só backend
  "server": "json-server --watch ./db.json --port 4000"
}
```

---

## 🎯 Como usar agora

### ✅ Opção 1: Rodar tudo junto (RECOMENDADO)
```powershell
npm run dev
```
**Resultado:**
- ✅ Frontend: `http://localhost:5173`
- ✅ Backend API: `http://localhost:4000`
- ✅ Cadastro de salas funciona!
- ✅ Contadores do Footer funcionam!

---

### 🔧 Opção 2: Rodar separadamente (se precisar debugar)

**Terminal 1 - Backend:**
```powershell
npm run dev:back
# ou
npm run server
```

**Terminal 2 - Frontend:**
```powershell
npm run dev:front
```

---

## 📊 O que o `concurrently` faz?

É um pacote que permite rodar **múltiplos comandos ao mesmo tempo**.

**Antes (manual):**
```powershell
# Terminal 1
npm run server

# Terminal 2  
npm run dev
```

**Depois (automático):**
```powershell
npm run dev  # Roda os dois!
```

---

## 🗂️ Estrutura dos dados (db.json)

O arquivo `db.json` agora tem o formato correto:

```json
{
  "filmes": [...],
  "salas": [
    {
      "id": "sala-1",
      "nome": "Sala IMAX",
      "capacidade": 200,
      "tipo": "IMAX",
      "recursos": {
        "somDolby": true,
        "arCondicionado": true,
        "acessibilidade": true,
        "lancheria": false
      },
      "status": "ativa"
    }
  ],
  "sessoes": [...],
  "ingressos": [...]
}
```

---

## 🔍 Verificando se está funcionando

### 1. Inicie o projeto:
```powershell
npm run dev
```

### 2. Você verá algo assim no terminal:
```
[0] json-server is running on port 4000
[1] VITE v5.x.x ready in xxx ms
[1] ➜ Local: http://localhost:5173/
```

### 3. Teste as APIs:
- **Frontend:** http://localhost:5173
- **API Salas:** http://localhost:4000/salas
- **API Filmes:** http://localhost:4000/filmes

### 4. Teste no navegador:
- Acesse `/salas`
- Cadastre uma nova sala
- Veja o contador no Footer atualizar automaticamente!

---

## 🐛 Resolução de problemas

### ❌ Erro: "Port 4000 already in use"
**Solução:** Outro processo está usando a porta 4000.

**Windows (PowerShell):**
```powershell
# Encontrar o processo
netstat -ano | findstr :4000

# Matar o processo (substitua PID pelo número encontrado)
taskkill /PID <PID> /F
```

### ❌ Erro: "concurrently: command not found"
**Solução:** Reinstale a dependência:
```powershell
npm install -D concurrently
```

### ❌ API retorna erro 404
**Causa:** `db.json` não existe ou está corrompido  
**Solução:** Use o arquivo `db.json` atualizado do projeto

---

## 📋 Comandos disponíveis

| Comando | O que faz |
|---------|-----------|
| `npm run dev` | **Roda frontend + backend juntos** (USE ESTE!) |
| `npm run dev:front` | Roda apenas o frontend (Vite) |
| `npm run dev:back` | Roda apenas o backend (JSON Server) |
| `npm run server` | Alias para `dev:back` |
| `npm run build` | Compila o projeto para produção |
| `npm run preview` | Visualiza o build de produção |

---

## 🎓 Conceitos importantes

### Por que preciso de um backend?

**React/Frontend:**
- É a "cara" do site (botões, formulários, tabelas)
- Roda no **navegador** do usuário
- **NÃO GUARDA DADOS** permanentemente

**Backend/API:**
- Guarda os dados (salas, filmes, sessões)
- Roda no **servidor**
- Responde às requisições do frontend

**Analogia:**
- Frontend = Garçom (pega o pedido, mostra o cardápio)
- Backend = Cozinha (prepara/guarda a comida)

### JSON Server é suficiente para produção?

**❌ NÃO!** JSON Server é apenas para **desenvolvimento/testes**.

Para produção, você precisa de um backend real:
- Node.js + Express
- Python + Django/Flask
- Java + Spring Boot
- .NET + ASP.NET Core

Mas para **aprender e prototipar**, JSON Server é perfeito! 🎯

---

## 🚀 Próximos passos

1. ✅ Teste o cadastro de salas
2. ⬜ Implemente as outras entidades (Filmes, Sessões)
3. ⬜ Quando estiver pronto, substitua JSON Server por um backend real
4. ⬜ Deploy do frontend (Vercel, Netlify)
5. ⬜ Deploy do backend (Heroku, AWS, Azure)

---

## 💡 Dica Pro

Adicione este script ao `package.json` para limpar o terminal antes de rodar:

```json
"dev": "concurrently -k -p \"[{name}]\" -n \"API,WEB\" -c \"blue,green\" \"npm run server\" \"vite\""
```

Isso adiciona cores e nomes aos logs! 🎨
