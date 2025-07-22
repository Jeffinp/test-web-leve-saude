# 📊 FeedbackHub - Painel Admin | Leve Saúde

Este repositório contém o painel administrativo do **FeedbackHub**, um sistema desenvolvido como parte do desafio técnico para a vaga de **Desenvolvedor React/React Native** na **Leve Saúde**.

🔗 **Deploy online:** [https://test-web-leve-saude.vercel.app/](https://test-web-leve-saude.vercel.app/)

---

## 🚀 Tecnologias Utilizadas

* ⚛️ **React + Vite** — estrutura moderna e rápida para SPAs
* 🟦 **TypeScript** — tipagem estática para mais segurança e produtividade
* 🎨 **Tailwind CSS** — estilização rápida e responsiva com classes utilitárias
* 🔥 **Firebase** — autenticação e armazenamento de dados com Firestore
* 🔀 **React Router DOM** — navegação entre páginas
* 🧹 **ESLint** + **Prettier** — padronização e qualidade do código

---

## ⚙️ Como Executar o Projeto Localmente

### 🔧 Pré-requisitos

* [Node.js](https://nodejs.org/en/) (v18 ou superior)
* [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### 📥 Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/Jeffinp/test-web-leve-saude.git
   ```

2. Acesse a pasta do projeto:

   ```bash
   cd test-web-leve-saude
   ```

3. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn
   ```

### 🔐 Configuração do Firebase

1. Crie um arquivo `.env` na raiz do projeto.
2. Adicione suas credenciais do Firebase:

```env
VITE_API_KEY="SUA_API_KEY"
VITE_AUTH_DOMAIN="SEU_AUTH_DOMAIN"
VITE_PROJECT_ID="SEU_PROJECT_ID"
VITE_STORAGE_BUCKET="SEU_STORAGE_BUCKET"
VITE_MESSAGING_SENDER_ID="SEU_MESSAGING_SENDER_ID"
VITE_APP_ID="SEU_APP_ID"
```

### ▶️ Executando o projeto

Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em: [http://localhost:5173](http://localhost:5173)

---

## 📁 Estrutura do Projeto

```
src/
├── assets/        # Imagens e ícones
├── components/    # Componentes reutilizáveis
├── context/       # Context API (Auth, etc.)
├── lib/           # Configurações externas (Firebase)
├── pages/         # Páginas principais
├── routes/        # Rotas da aplicação
├── styles/        # Estilos globais
└── utils/         # Funções utilitárias
```

---

## 🧪 Testes

> Este projeto ainda **não possui testes automatizados**, mas foi estruturado para facilitar a adição futura de testes unitários e de integração.

---

## 🧠 Considerações Finais

O painel foi desenvolvido com foco em clareza, boas práticas e experiência do usuário. Toda autenticação, controle de rotas e integração com o Firebase estão devidamente implementadas.

Sinta-se à vontade para abrir issues ou enviar pull requests!

---

## 📩 Contato

Desenvolvido por **Jeferson Reis**
[LinkedIn](linkedin.com/in/jeferson-reis-877a942b7) • [GitHub](https://github.com/jeffinp)

---

Se quiser, posso montar um badge para build/deploy ou adicionar GIF demonstrativo com a interface também. Deseja isso?
