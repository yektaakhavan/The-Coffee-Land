# ☕ The Coffee Land

A full-stack coffee shop e-commerce application: a React 19 storefront and admin dashboard connected to a real Node.js REST API and PostgreSQL database.

[![Live Demo](https://img.shields.io/badge/Live_Demo-the--coffee--land.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://the-coffee-land.vercel.app/)
[![Backend Repo](https://img.shields.io/badge/Backend-coffee--land--backend-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://github.com/yektaakhavan/coffee-land-backend)

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Vitest](https://img.shields.io/badge/Tested_with-Vitest-6E9F18?logo=vitest&logoColor=white)

> This repository contains the **frontend**. The API lives in a separate repo: [coffee-land-backend](https://github.com/yektaakhavan/coffee-land-backend).

---

## Table of Contents

- [Overview](#overview)
- [Screenshots](#screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture & Key Decisions](#architecture--key-decisions)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Performance](#performance)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Roadmap](#roadmap)
- [Author](#author)

---

## Overview

The Coffee Land simulates a real-world online store with two main areas:

- **Customer storefront**: browse products, manage a cart, register/log in, and place orders.
- **Admin dashboard**: manage products, categories, orders, customers, coupons, reviews, articles, and store settings.

Unlike a frontend-only mockup, the app talks to a real backend API and database. An order placed at checkout is stored in PostgreSQL and immediately appears in the admin dashboard.

The interface is **RTL-first** (Persian) with a custom coffee-inspired design system.

## Screenshots

### Customer Storefront

![Home page](src/assets/images/Preview/Home-Banner.png)

### Admin Dashboard

<!-- TODO: add 1-2 dashboard screenshots, e.g. src/assets/images/Preview/Admin-Dashboard.png -->

![Admin dashboard](src/assets/images/Preview/Admin-Dashboard.png)

## Features

### Customer Storefront

- Responsive home, shop, product detail, cart, and checkout pages
- Product search, filtering, sorting, and category browsing
- Cart with quantity management, discount and free-shipping calculation
- Checkout form with client-side validation (React Hook Form + Zod)
- Registration and authentication
- Protected and guest-only routes, role-based access control
- Blog and article pages
- Toast notifications and an order success flow

### Admin Dashboard

- Sales statistics and charts
- Products: create, edit, pricing, inventory, categories
- Orders and order status updates
- Coupons, customers, reviews, and articles
- Store settings
- Delete confirmation flows

## Tech Stack

### Frontend (this repo)

| Technology            | Purpose                       |
| --------------------- | ----------------------------- |
| React 19              | UI                            |
| React Router 7        | Client-side routing           |
| Tailwind CSS v4       | Styling and responsive layout |
| React Hook Form + Zod | Forms and validation          |
| React Context API     | Domain-based state management |
| Recharts              | Admin dashboard charts        |
| Vitest + RTL          | Unit and component tests      |
| Vite                  | Dev server and build          |

### Backend ([separate repo](https://github.com/yektaakhavan/coffee-land-backend))

| Technology | Purpose                     |
| ---------- | --------------------------- |
| Node.js    | Runtime                     |
| REST API   | Client-server communication |
| PostgreSQL | Database                    |
| JWT        | Authentication              |
| bcrypt     | Password hashing            |

Deployed on **Vercel**.

## Architecture & Key Decisions

**Context-based state, split by domain.** Auth, cart, products, categories, orders, and toasts each have their own context, so every domain stays isolated and easy to reason about.

**Centralized API layer.** All backend communication goes through `src/lib/api.js`. Contexts call this wrapper and map backend responses into the shapes the UI expects, which keeps API details out of presentation components.

**Server-side price validation.** Prices are never trusted from the client. At checkout, the backend reads current prices from the database and computes the order total itself, so a manipulated request cannot change what a customer pays.

**Transaction-safe stock management.** Order creation uses a PostgreSQL transaction with row-level locking, so two customers cannot both buy the last unit of a product.

**Authentication & authorization.** JWT-based auth, bcrypt password hashing, protected and guest-only routes, and role-based access control. Admin actions require an authenticated user with the right role.

## Project Structure

```
src/
├── assets/          # fonts, images
├── components/
│   ├── admin/
│   ├── checkout/
│   ├── layout/
│   ├── shared/
│   ├── shop/
│   └── ui/
├── constants/
├── context/         # Auth, Cart, Order, Product, Category, Toast
├── data/
├── lib/
│   └── api.js       # centralized API client
├── pages/
│   ├── admin/
│   ├── auth/
│   └── public/
├── utils/
├── validation/      # Zod schemas
└── routes.jsx
```

## Testing

Unit and component tests use **Vitest** and **React Testing Library**.

Covered areas:

- Price calculation, price formatting, order normalization
- Product card rendering, discount display, out-of-stock state
- Product links and image lazy loading

```bash
npm run test
```

## Performance

- Route-based code splitting with `React.lazy`
- Lazy loading and async decoding for product images
- `React.memo` for reusable product cards
- Production build optimization through Vite

## Getting Started

### Prerequisites

- Node.js and npm
- A running instance of the [backend API](https://github.com/yektaakhavan/coffee-land-backend) (which requires PostgreSQL)

### Installation

```bash
git clone https://github.com/yektaakhavan/The-Coffee-Land.git
cd The-Coffee-Land
npm install
cp .env.example .env
```

Set the backend URL in `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

> Adjust the URL and port to match your backend setup. Never commit real secrets: `.env` is git-ignored, and `.env.example` only contains placeholders.

Start the dev server:

```bash
npm run dev
```

The app is available at `http://localhost:5173`.

## Available Scripts

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start the development server |
| `npm run build`   | Create a production build    |
| `npm run preview` | Preview the production build |
| `npm run test`    | Run the test suite           |
| `npm run lint`    | Run ESLint                   |

## Roadmap

- [ ] Payment gateway sandbox integration
- [ ] Direct product image upload
- [ ] Phone-number authentication
- [ ] English / Persian language switcher
- [ ] End-to-end tests with Playwright

## Author

**Yekta Akhavan**

[![Gmail](https://img.shields.io/badge/Gmail-yekta.akhavan.dev@gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:yekta.akhavan.dev@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Yekta_Akhavan-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/yekta-akhavan/)
[![Portfolio](https://img.shields.io/badge/Portfolio-yekta--akhavan.vercel.app-000000?style=flat-square&logo=vercel&logoColor=white)](https://yekta-akhavan.vercel.app/)
