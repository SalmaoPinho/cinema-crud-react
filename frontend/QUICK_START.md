# 🚀 Guia Rápido - Testando o Sistema de Salas

## ✅ O que foi implementado

### 📁 Arquivos criados/atualizados:

1. **`src/models/sala.model.ts`** - Interface e validação de Salas
2. **`src/services/sala.service.ts`** - Service com métodos CRUD
3. **`src/pages/SalasPages/index.tsx`** - Página completa com formulário e listagem
4. **`src/components/Footer/index.tsx`** - Footer com contadores dinâmicos
5. **`db-salas-example.json`** - Exemplo de dados (3 salas)
6. **`TYPESCRIPT_GUIDE.md`** - Documentação completa

---

## 🔧 Como testar localmente

### Opção 1: Com JSON Server (Recomendado)

1. **Instale o JSON Server** (se ainda não tiver):
```powershell
npm install -g json-server
```

2. **Inicie o servidor mock** (na pasta `frontend`):
```powershell
json-server --watch db-salas-example.json --port 4000
```

3. **Em outro terminal, inicie o frontend**:
```powershell
npm run dev
```

4. **Acesse no navegador**:
   - Frontend: `http://localhost:5173`
   - API Mock: `http://localhost:4000/salas`

### Opção 2: Testar apenas o frontend (sem API)

Se a API não estiver disponível, o sistema vai mostrar alertas mas não vai quebrar.

---

## 📊 Como funciona o contador de salas

### No Footer (`src/components/Footer/index.tsx`):

```typescript
const [totalSalas, setTotalSalas] = useState(3); // Valor inicial

useEffect(() => {
    const carregarEstatisticas = async () => {
        try {
            const salas = await salasService.findAll();
            setTotalSalas(salas.length); // Atualiza com dados reais
        } catch (error) {
            // Mantém o valor inicial (3) se houver erro
        }
    };
    carregarEstatisticas();
}, []);
```

### 🎯 Comportamento:
- **Valor inicial:** 3 salas (hardcoded como fallback)
- **Com API funcionando:** Busca quantidade real do backend
- **Sem API:** Mantém o valor inicial de 3

---

## 🔄 Para mudar a quantidade inicial

### Edite o arquivo: `src/components/Footer/index.tsx`

Linha 6:
```typescript
const [totalSalas, setTotalSalas] = useState(3); // ← Mude este número
```

Exemplos:
```typescript
useState(5);  // Inicia com 5 salas
useState(10); // Inicia com 10 salas
useState(0);  // Inicia com 0 salas
```

---

## 🧪 Testando as funcionalidades

### 1. **Cadastrar Sala**
- Acesse: `/salas`
- Preencha o formulário
- Clique em "Salvar Sala"
- A sala aparece na lista abaixo

### 2. **Editar Sala**
- Clique no botão amarelo (✏️) ao lado da sala
- Formulário preenchido automaticamente
- Faça as alterações
- Clique em "Atualizar Sala"

### 3. **Excluir Sala**
- Clique no botão vermelho (🗑️) ao lado da sala
- Confirme a exclusão
- Sala removida da lista

### 4. **Ver Contador Atualizado**
- Cada ação atualiza automaticamente:
  - Badge no topo da página de salas
  - Contador no Footer (rodapé)

---

## 🐛 Resolvendo problemas

### ❌ Erro: "Failed to fetch"
**Causa:** Backend não está rodando  
**Solução:** Inicie o JSON Server ou backend real

### ❌ Erro: "CORS policy"
**Causa:** Configuração de CORS no backend  
**Solução:** Configure o backend para aceitar requisições do frontend

### ❌ Contador sempre mostra 3
**Causa:** API não está retornando dados ou há erro de conexão  
**Solução:** 
1. Verifique se o backend está rodando
2. Verifique o console do navegador (F12) para erros
3. Confirme a URL da API no `sala.service.ts`

---

## 📝 Adicionando outras entidades

Para criar **Filmes**, **Sessões** ou **Ingressos**, siga o mesmo padrão:

```
src/models/filme.model.ts
src/services/filme.service.ts
src/pages/FilmesPages/index.tsx
```

Copie a estrutura de `sala.*` e adapte!

---

## 🎨 Customizações

### Alterar tipos de sala
**Arquivo:** `src/models/sala.model.ts`
```typescript
tipo: '2D' | '3D' | '4DX' | 'IMAX' | 'VIP' | 'DOLBY' | 'PREMIUM';
```

### Adicionar novos recursos
```typescript
recursos: {
    somDolby: boolean;
    arCondicionado: boolean;
    acessibilidade: boolean;
    lancheria: boolean;
    wifi: boolean;           // ← Novo
    poltronasReclinaveis: boolean; // ← Novo
}
```

---

## 📞 Suporte

Se tiver dúvidas, consulte:
- **`TYPESCRIPT_GUIDE.md`** - Documentação completa
- **Arquivos de exemplo** - Veja como `usuario.*` foi implementado
- **Console do navegador** (F12) - Erros detalhados

---

## ✨ Próximos passos

1. ✅ Testar cadastro de salas
2. ⬜ Implementar models/services para Filmes
3. ⬜ Implementar models/services para Sessões
4. ⬜ Implementar models/services para Ingressos
5. ⬜ Conectar com backend real (substituir JSON Server)
