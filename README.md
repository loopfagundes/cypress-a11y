# ♿ POC – Automação de Testes de Acessibilidade

## 📌 Objetivo

Esta Prova de Conceito (POC) tem como objetivo demonstrar a viabilidade da automação de testes de acessibilidade utilizando **Cypress + axe-core**, seguindo as diretrizes da **WCAG 2.1 nível AA**.

A proposta é identificar automaticamente violações críticas e sérias de acessibilidade e gerar evidências em formato de relatório.

---

## 🛠 Tecnologias Utilizadas

- Node.js
- Cypress 15.x
- cypress-axe
- axe-core (Deque Systems)
- axe-html-reporter (geração de relatório HTML)

---

## 🌐 Sistema Avaliado

- https://bugbank.netlify.app/

---

## 🔎 Escopo da POC

Foram analisados os seguintes cenários:

1. Home (não autenticado)
2. Modal de cadastro
3. Área autenticada (pós-login)

As verificações foram executadas considerando severidades:

- `critical`
- `serious`

---

## 🚀 Como Executar

```bash
cd Desktop
mkdir cypress-a11y
cd cypress-a11y
npm init -y
npm install cypress --save-dev
npx cypress open #(Cypress UI - opção E2E Testing)
npm i -D cypress-axe axe-core
```

### 1️⃣ Instalar dependências

```bash
npm install
```

### 2️⃣ Executar os testes

```bash
npx cypress run
```
Rodar testes (headless)

```bash
npm run cy:run
```
Rodar em Chrome (recomendado)
```bash
npm run cy:run:chrome
```

Abrir UI do Cypress
```bash
npm run cy:open
```

### 3️⃣ Gerar relatório HTML

O relatório será gerado automaticamente em:

```bash
/reports/a11y-report.html
```

### 4️⃣ Opcional: converter para PDF:

```bash
node scripts/html-to-pdf.js
```