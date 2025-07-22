# 📊 FeedbackHub - Painel Administrativo | Teste Técnico Leve Saúde

> **Aplicação Web React** para administração e visualização de feedbacks dos usuários.

🔗 **Deploy Online:** [https://test-web-leve-saude.vercel.app/](https://test-web-leve-saude.vercel.app/)

---

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como parte do **Teste Técnico para Desenvolvedor React/React Native** da **Leve Saúde**. É uma aplicação web administrativa que permite visualizar, filtrar, ordenar e exportar feedbacks enviados pelos usuários através do aplicativo mobile.

### 🎯 Objetivo
Criar uma aplicação web moderna e responsiva para administradores visualizarem e gerenciarem feedbacks dos usuários, com foco em usabilidade, performance e boas práticas de desenvolvimento.

---

## ✅ Funcionalidades Implementadas

### 📱 **Funcionalidades Obrigatórias**
- ✅ **Autenticação com Firebase** (email e senha)
- ✅ **Dashboard completo** com listagem de todos os feedbacks
- ✅ **Exibição de dados**: Nome do usuário, nota (1-5 estrelas), comentário e data
- ✅ **Filtros de ordenação**: Por data (mais recentes/antigos) ou nota (maior/menor)
- ✅ **Busca avançada**: Por nome de usuário ou texto do comentário
- ✅ **Estilização com Tailwind CSS**: Design moderno e responsivo
- ✅ **Deploy funcional**: Hospedado na Vercel
- ✅ **Firebase Firestore**: Integração para leitura dos feedbacks
- ✅ **React + Vite + TypeScript**: Stack moderna com tipagem estática
- ✅ **ESLint + Prettier**: Padronização e qualidade do código
- ✅ **Repositório Git**: Histórico organizado com commits claros

### 🚀 **Funcionalidades Extras (Diferenciais)**
- ✅ **Dashboard com Estatísticas**: Métricas em tempo real (total, média, avaliações altas/baixas)
- ✅ **Sistema de Notificações**: Toast notifications para feedback visual
- ✅ **Loading States**: Skeleton loading animado durante carregamento
- ✅ **Exportação de Dados**: Download de feedbacks em CSV e JSON
- ✅ **Componentes Reutilizáveis**: Arquitetura modular e escalável
- ✅ **Animações CSS**: Transições suaves e micro-interações
- ✅ **Tratamento de Erros**: Feedback visual para falhas de conexão
- ✅ **Configuração Segura**: Variáveis de ambiente para credenciais

---

## 🛠 Tecnologias Utilizadas

### **Frontend**
| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **React** | 19.1.0 | Biblioteca principal para UI |
| **Vite** | 7.0.4 | Build tool moderna e rápida |
| **TypeScript** | 5.8.3 | Tipagem estática |
| **Tailwind CSS** | 4.1.11 | Framework CSS utilitário |
| **React Router DOM** | 7.7.0 | Roteamento SPA |

### **Backend & Infraestrutura**
| Tecnologia | Uso |
|------------|-----|
| **Firebase Auth** | Autenticação de usuários |
| **Firebase Firestore** | Banco de dados NoSQL |
| **Vercel** | Deploy e hospedagem |

### **Desenvolvimento & Qualidade**
| Ferramenta | Uso |
|------------|-----|
| **ESLint** | Análise estática de código |
| **Prettier** | Formatação automática |
| **Git** | Controle de versão |

---

## 📁 Arquitetura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── StatsCard.tsx   # Card de estatísticas
│   ├── LoadingSkeleton.tsx # Skeleton loading
│   ├── Toast.tsx       # Notificações
│   ├── ExportButton.tsx # Botão de exportação
│   └── ProtectedRoute.tsx # Proteção de rotas
├── context/            # Context API
│   └── AuthContext.tsx # Contexto de autenticação
├── hooks/              # Custom hooks
│   └── useToast.ts     # Hook para notificações
├── lib/                # Configurações externas
│   └── firebase.ts     # Configuração Firebase
├── pages/              # Páginas principais
│   ├── Login.tsx       # Página de login
│   └── Dashboard.tsx   # Dashboard principal
├── utils/              # Funções utilitárias
│   └── exportUtils.ts  # Utilitários de exportação
├── App.tsx            # Componente raiz
├── main.tsx           # Entry point
└── index.css          # Estilos globais
```

### 🧩 **Componentização**

#### **Componentes Reutilizáveis**
- **`StatsCard`**: Card genérico para exibição de métricas
- **`LoadingSkeleton`**: Componente de loading com animação
- **`Toast`**: Sistema de notificações temporárias
- **`ExportButton`**: Botão dropdown para exportação
- **`ProtectedRoute`**: HOC para proteção de rotas

#### **Custom Hooks**
- **`useToast`**: Gerenciamento de estado das notificações
- **`useAuth`**: Contexto de autenticação (Firebase)

#### **Utilitários**
- **`exportUtils`**: Funções para exportar dados (CSV/JSON)

---

## ⚙️ Instalação e Execução

### 🔧 **Pré-requisitos**
- [Node.js](https://nodejs.org/en/) (v18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Conta Firebase configurada

### 📥 **Passo a Passo**

1. **Clone o repositório**
   ```bash
   git clone https://github.com/Jeffinp/test-web-leve-saude.git
   cd test-web-leve-saude
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   # Crie um arquivo .env na raiz do projeto
   cp .env.example .env
   ```
   
   Edite o `.env` com suas credenciais do Firebase:
   ```env
   VITE_API_KEY="sua_api_key"
   VITE_AUTH_DOMAIN="seu_auth_domain"
   VITE_PROJECT_ID="seu_project_id"
   VITE_STORAGE_BUCKET="seu_storage_bucket"
   VITE_MESSAGING_SENDER_ID="seu_messaging_sender_id"
   VITE_APP_ID="seu_app_id"
   ```

4. **Execute o projeto**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. **Acesse a aplicação**
   ```
   http://localhost:5173
   ```

### 🏗️ **Build para Produção**
```bash
npm run build
npm run preview
```

---

## 📱 Responsividade

A aplicação foi desenvolvida com **design responsivo** utilizando Tailwind CSS:

- **Mobile First**: Layout otimizado para dispositivos móveis
- **Breakpoints**: Adaptação automática para tablet e desktop
- **Grid System**: Layout flexível que se adapta ao tamanho da tela
- **Componentes Flexíveis**: Elementos que se reorganizam conforme necessário

### 📐 **Breakpoints Utilizados**
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

---

## 🧪 Testes e Qualidade

### **Padronização de Código**
```bash
# Verificar lint
npm run lint

# Build e verificação de tipos
npm run build
```

### **Boas Práticas Implementadas**
- ✅ **TypeScript**: Tipagem estática em 100% do código
- ✅ **ESLint**: Regras rigorosas de qualidade
- ✅ **Prettier**: Formatação automática consistente
- ✅ **Componentes Funcionais**: Uso de hooks modernos
- ✅ **Custom Hooks**: Lógica reutilizável extraída
- ✅ **Memoização**: Performance otimizada com `useMemo`
- ✅ **Error Handling**: Tratamento adequado de erros
- ✅ **Loading States**: UX melhorada com feedback visual

---

## 🚀 Deploy

### **Vercel (Recomendado)**
O projeto está configurado para deploy automático na Vercel:

1. Conecte seu repositório GitHub à Vercel
2. Configure as variáveis de ambiente no painel da Vercel
3. Deploy automático a cada push na branch `main`

### **Outras Plataformas**
- **Netlify**: Compatível com build estático
- **GitHub Pages**: Suporte nativo para SPAs
- **AWS S3 + CloudFront**: Para projetos empresariais

---

## 📊 Funcionalidades em Destaque

### **Dashboard Inteligente**
- 📈 **Métricas em Tempo Real**: Total, média e distribuição de avaliações
- 🔍 **Busca Avançada**: Filtro por nome ou conteúdo do comentário
- 📅 **Ordenação Flexível**: Por data ou nota, crescente/decrescente
- 📱 **Interface Responsiva**: Adaptação automática para qualquer dispositivo

### **Sistema de Exportação**
- 📄 **CSV**: Para análise em planilhas
- 📋 **JSON**: Para integração com outras APIs
- 🎯 **Dados Filtrados**: Exporta apenas os resultados da busca atual

### **UX Aprimorada**
- ⚡ **Loading Skeleton**: Indicação visual durante carregamento
- 🔔 **Notificações**: Feedback imediato para ações do usuário
- 🎨 **Animações Suaves**: Micro-interações que melhoram a experiência

---

## 📝 Commits e Versionamento

### **Padrão de Commits**
```
tipo(escopo): descrição concisa

feat: adiciona nova funcionalidade
fix: corrige bug específico
docs: atualiza documentação
style: ajustes de formatação
refactor: refatoração sem mudança funcional
test: adiciona ou corrige testes
```

### **Histórico Limpo**
- ✅ Commits atômicos e bem descritos
- ✅ Mensagens em português claro
- ✅ Histórico linear sem merges desnecessários
- ✅ Tags para releases importantes

---

## 👨‍💻 Desenvolvedor

**Jeferson Reis**
- 🔗 [LinkedIn](https://linkedin.com/in/jeferson-reis-877a942b7)
- 🐙 [GitHub](https://github.com/jeffinp)
- 📧 **Email:** jefersonreisalmeida8356@gmail.com

---

## 📄 Licença

Este projeto foi desenvolvido exclusivamente para o teste técnico da **Leve Saúde** e não possui licença de uso comercial.

---

<div align="center">

**Desenvolvido com ❤️ para o teste técnico da Leve Saúde**

*Demonstrando conhecimento em React, TypeScript, Firebase e boas práticas de desenvolvimento*

</div>