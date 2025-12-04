# 📁 Estrutura de Código TypeScript - Cinema CRUD

## 🎯 Onde colocar os códigos TypeScript

Para cada funcionalidade do sistema (Salas, Filmes, Sessões, Ingressos), siga esta estrutura:

### 1️⃣ **Models** (`src/models/`)
Define a estrutura de dados e validações.

**Exemplo:** `sala.model.ts`
```typescript
export interface ISala {
    id?: string;
    nome: string;
    capacidade: number;
    tipo: 'STANDARD' | '3D' | 'IMAX' | '4DX' | 'VIP';
    recursos: {
        somDolby: boolean;
        arCondicionado: boolean;
        acessibilidade: boolean;
        lancheria: boolean;
    };
    status: 'ativa' | 'inativa' | 'manutencao';
}
```

### 2️⃣ **Services** (`src/services/`)
Gerencia comunicação com a API (CRUD).

**Exemplo:** `sala.service.ts`
```typescript
export class SalasService {
    async findAll(): Promise<ISala[]> { /* ... */ }
    async findById(id: string): Promise<ISala> { /* ... */ }
    async create(sala: Omit<ISala, 'id'>): Promise<ISala> { /* ... */ }
    async update(id: string, sala: Partial<ISala>): Promise<ISala> { /* ... */ }
    async delete(id: string): Promise<void> { /* ... */ }
}

export const salasService = new SalasService();
```

### 3️⃣ **Pages/Components** (`src/pages/` ou `src/components/`)
Interface visual com React.

**Exemplo:** `SalasPages/index.tsx`
```typescript
import { useState, useEffect } from 'react';
import { salasService } from '../../services/sala.service';
import { type ISala } from '../../models/sala.model';

export const SalasPages = () => {
    const [salas, setSalas] = useState<ISala[]>([]);
    
    useEffect(() => {
        carregarSalas();
    }, []);
    
    const carregarSalas = async () => {
        const dados = await salasService.findAll();
        setSalas(dados);
    };
    
    // ... resto do código
};
```

---

## 🔧 Como atualizar a quantidade de salas (ou qualquer contador)

### Opção 1: Valor estático (Hardcoded)
**Arquivo:** `src/components/Footer/index.tsx`

```typescript
const [totalSalas, setTotalSalas] = useState(3); // Define valor inicial como 3
```

### Opção 2: Buscar da API (Recomendado)
```typescript
useEffect(() => {
    const carregarEstatisticas = async () => {
        const salas = await salasService.findAll();
        setTotalSalas(salas.length); // Atualiza dinamicamente
    };
    carregarEstatisticas();
}, []);
```

---

## 📊 Arquivos Criados no Projeto

### ✅ Models
- `src/models/sala.model.ts` - Interface e validação para Salas

### ✅ Services
- `src/services/sala.service.ts` - CRUD completo para Salas

### ✅ Pages (Atualizados)
- `src/pages/SalasPages/index.tsx` - Página com formulário e listagem
- `src/components/Footer/index.tsx` - Footer com contadores dinâmicos

---

## 🚀 Como usar

### 1. Cadastrar uma nova sala
```typescript
const novaSala: Omit<ISala, 'id'> = {
    nome: "Sala Premium 1",
    capacidade: 150,
    tipo: "IMAX",
    recursos: {
        somDolby: true,
        arCondicionado: true,
        acessibilidade: true,
        lancheria: false
    },
    status: "ativa"
};

await salasService.create(novaSala);
```

### 2. Listar todas as salas
```typescript
const salas = await salasService.findAll();
console.log(`Total de salas: ${salas.length}`);
```

### 3. Buscar sala por ID
```typescript
const sala = await salasService.findById("123");
```

### 4. Atualizar sala
```typescript
await salasService.update("123", {
    capacidade: 200,
    recursos: { ...sala.recursos, lancheria: true }
});
```

### 5. Excluir sala
```typescript
await salasService.delete("123");
```

---

## 🔄 Fluxo de dados

```
┌─────────────────┐
│   Component     │  ← Interface visual (React)
│  (SalasPages)   │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│    Service      │  ← Lógica de negócio + API
│ (salasService)  │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│      Model      │  ← Estrutura de dados
│    (ISala)      │
└─────────────────┘
         │
         ↓
┌─────────────────┐
│   Backend API   │  ← http://localhost:4000/salas
└─────────────────┘
```

---

## 📝 Próximos passos

Para adicionar outras entidades (Filmes, Sessões, Ingressos), repita a estrutura:

1. Criar `src/models/[entidade].model.ts`
2. Criar `src/services/[entidade].service.ts`
3. Criar ou atualizar `src/pages/[Entidade]Pages/index.tsx`
4. Adicionar rota em `src/routers/app.routers.tsx`

---

## 🛠️ Configuração do Backend

Certifique-se de que o backend está rodando em:
- **Salas:** `http://localhost:4000/salas`
- **Usuários:** `http://localhost:4000/usuarios`

Configure as variáveis de ambiente em `.env`:
```env
VITE_API_URL_SALAS=http://localhost:4000/salas
VITE_API_URL=http://localhost:4000/usuarios
```
