## Seed de Feedbacks para o Firestore

Este script `seed.cjs` foi criado para facilitar a popularização de usuários e feedbacks no banco de dados Firestore, utilizando JavaScript e a biblioteca `firebase-admin`. Ele insere diversos registros de feedback automaticamente, evitando duplicidades.

### Como usar

1. Certifique-se de ter o arquivo de credenciais do Firebase (`admin.json`) na pasta `secrets`.
2. Instale as dependências necessárias:
   ```bash
   npm install firebase-admin
   ```
3. Execute o script:
   ```bash
   node seed.cjs
   ```

### O que o script faz

- Conecta ao Firestore usando as credenciais fornecidas.
- Insere uma lista de feedbacks fictícios no banco de dados, apenas se ainda não existirem (evita duplicidade por usuário e comentário).
- Exibe no terminal o status de cada inserção.

### Requisitos

- Node.js instalado
- Permissão para acessar o Firestore
- Arquivo de credenciais válido

### Personalização

Você pode editar o array `feedbacks` no script para adicionar, remover ou modificar os registros conforme desejar.

---

Script feito para facilitar testes e desenvolvimento.
