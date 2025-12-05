# 🎬 Scripts Batch - Guia Rápido

## ⚡ Script Principal

### `run.bat` - Tudo em Um ⭐
**Execute e esqueça!** Este script faz tudo automaticamente:
- Verifica se já está instalado
- Instala dependências (se necessário)
- Configura banco de dados (se necessário)  
- Inicia a aplicação

**Uso:**
```bash
run.bat
```

**Primeira vez:** Instala tudo e inicia (~2-5 min)
**Próximas vezes:** Apenas inicia (~5 seg)

---

## 📝 Scripts Individuais

### `install.bat` - Instalação Completa
Executa toda a instalação automaticamente:
1. Instala dependências da raiz
2. Instala dependências do frontend
3. Instala dependências do backend
4. Gera Prisma Client
5. Cria banco de dados

**Uso:**
```bash
install.bat
```

---

### `start.bat` - Iniciar Aplicação
Inicia frontend e backend simultaneamente.

**Uso:**
```bash
start.bat
```

**Acesse:**
- Frontend: http://localhost:5173
- Backend: http://localhost:4000

**Parar:** Pressione `Ctrl+C`

---

### `setup-db.bat` - Configurar Banco
Gera Prisma Client e executa migrations.

**Uso:**
```bash
setup-db.bat
```

**Quando usar:**
- Após modificar `schema.prisma`
- Para resetar o banco de dados
- Após clonar o projeto

---

### `prisma-studio.bat` - Interface do Banco
Abre interface visual para gerenciar dados.

**Uso:**
```bash
prisma-studio.bat
```

**Acesse:** http://localhost:5555

---

### `clean.bat` - Limpar Projeto
Remove arquivos temporários e dependências.

**Uso:**
```bash
clean.bat
```

**Remove:**
- `node_modules` (todos)
- `dist` (backend)
- Banco de dados SQLite
- Migrations

**⚠️ Atenção:** Pede confirmação antes de executar.

---

## 🔄 Fluxo Típico de Uso

### Primeira vez:
```bash
1. install.bat      # Instalar tudo
2. start.bat        # Iniciar aplicação
```

### Desenvolvimento:
```bash
start.bat           # Iniciar sempre que for trabalhar
```

### Após modificar schema:
```bash
setup-db.bat        # Atualizar banco
```

### Visualizar dados:
```bash
prisma-studio.bat   # Abrir interface
```

### Limpar e reinstalar:
```bash
clean.bat           # Limpar
install.bat         # Reinstalar
```

---

## 💡 Dicas

- **Todos os scripts** mostram mensagens de progresso
- **Erros** são exibidos claramente
- **Confirmação** é pedida para operações destrutivas
- **Pause** no final permite ver resultados

---

## 🐛 Troubleshooting

### Script não executa:
- Clique com botão direito → "Executar como administrador"

### Erro "npm não reconhecido":
- Certifique-se que Node.js está instalado
- Reinicie o terminal

### Porta em uso:
- Pare outros servidores na porta 4000 ou 5173
- Ou mude as portas no `.env`
