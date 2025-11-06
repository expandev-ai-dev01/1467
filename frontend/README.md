# Monster Energy Catalog

Catálogo de produtos Monster Energy com funcionalidades de filtro por texto e preço, e opção de adicionar itens ao carrinho de compras.

## Tecnologias

- React 18.3.1
- TypeScript 5.6.3
- Vite 5.4.11
- TailwindCSS 3.4.14
- React Router DOM 6.26.2
- TanStack Query 5.59.20
- Zustand 5.0.1
- Axios 1.7.7

## Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── App.tsx            # Componente raiz
│   └── router.tsx         # Configuração de rotas
├── assets/                # Recursos estáticos
│   └── styles/           # Estilos globais
├── core/                  # Componentes e utilitários compartilhados
│   ├── components/       # Componentes genéricos
│   ├── lib/              # Configurações de bibliotecas
│   └── utils/            # Funções utilitárias
├── domain/               # Módulos de domínio
├── pages/                # Páginas da aplicação
│   └── layouts/         # Layouts compartilhados
└── main.tsx             # Ponto de entrada
```

## Instalação

```bash
npm install
```

## Configuração

1. Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Configure as variáveis de ambiente:
```
VITE_API_URL=http://localhost:3000
VITE_API_VERSION=v1
VITE_API_TIMEOUT=30000
```

## Desenvolvimento

```bash
npm run dev
```

Acesse http://localhost:5173

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Funcionalidades

- ✅ Catálogo de produtos Monster Energy
- ✅ Filtro por texto
- ✅ Filtro por preço
- ✅ Modal de detalhes do produto
- ✅ Tela de loading
- ✅ Adicionar ao carrinho
- ✅ Visualização do carrinho
- ✅ Navegação sem login
- ✅ Login para finalização de compra
- ✅ Persistência do carrinho
- ✅ Design responsivo
- ✅ Integração com Google Shopping
- ✅ Gerenciamento de imagens
- ✅ Detalhamento de produto

## Padrões de Código

- TypeScript strict mode habilitado
- ESLint configurado
- Componentes funcionais com hooks
- Nomenclatura em inglês para código
- Comentários e documentação em português
- JSDoc para documentação de componentes

## Estrutura de Componentes

Todos os componentes seguem a estrutura:
```
ComponentName/
├── main.tsx      # Implementação
├── types.ts      # Tipos TypeScript
└── index.ts      # Exports
```

## API

O frontend se comunica com o backend através de:
- `/api/v1/external/*` - Endpoints públicos
- `/api/v1/internal/*` - Endpoints autenticados

## Contribuição

1. Crie uma branch para sua feature
2. Faça commit das mudanças
3. Abra um Pull Request

## Licença

Proprietary - Monster Energy Catalog