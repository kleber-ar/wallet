# 💰 Gerenciador de Despesas
## Projeto online: [https://kleber-ar-wallet.vercel.app](https://kleber-ar-wallet.vercel.app)

Aplicação de controle de despesas pessoais, desenvolvida em **React**, com **Redux** para gerenciamento de estado global e testes seguindo **TDD (Test Driven Development)**.

---
## 💡 Observações

 - A aplicação consome uma API de cotações para valores atualizados de moedas.
 - Todas as alterações são armazenadas em Redux, garantindo estado global consistente.

---
## 🚀 Tecnologias Utilizadas

- ⚛️ **React** – Biblioteca para construção da interface  
- ⚡ **Vite** - Bundler rápido para desenvolvimento moderno  
- 🟦 **TypeScript** – Tipagem estática para maior segurança e escalabilidade  
- 🔄 **Redux** – Gerenciamento de estado global  
- 🧪 **Vitest + React Testing Library + Test Coverage** – Testes unitários e de integração  
- 🎨 **CSS Modules** – Estilização modular e componentizada  
- 📡 **API de Cotações** – Para obter valores atualizados de moedas  

---

## 🛠️ Funcionalidades

- Cadastro de despesas com descrição, valor e moeda  
- Conversão automática de valores para Real (BRL)  
- Tabela com histórico de despesas  
- Edição e exclusão de lançamentos  
- Total de despesas atualizado em tempo real  
- Interface responsiva e simples  

---

## 🧪 Testes

O projeto foi desenvolvido seguindo **TDD (Test Driven Development)**.  
Os testes garantem:  

- Renderização correta dos componentes principais  
- Fluxo de adicionar, editar e excluir despesas  
- Integração **Redux + Componentes**  
- Validação da atualização do total de despesas  

**Status de Testes:**
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)
