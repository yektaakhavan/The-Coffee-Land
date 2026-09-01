# ☕ The Coffee Land

A full-featured coffee shop e-commerce application built with **React 19**,
including a complete **customer storefront** and a **fully functional admin
dashboard** — product, category, order, coupon, review, and article
management, all wired end-to-end (a real order placed at checkout actually
shows up in the admin panel, not just mock data).

---

## ✨ Features

### Customer-facing storefront
- Home, About, Contact, Shop, Product detail, Cart, Checkout, Order success
- Blog / articles with individual article pages
- Product search, category filter, price range filter, and sorting (price / rating)
- Cart with quantity controls, discount calculation, and free-shipping threshold
- Checkout form with full client-side validation (React Hook Form + Zod)
- Toast notifications (e.g. "added to cart") — no page reload, no external UI library
- Auth: sign up / sign in, protected & guest-only routes, role-based access (admin vs customer)

### Admin dashboard
- Dashboard with sales chart, recent orders, and quick actions
- **Products** — create/edit with full form validation, image, pricing, inventory
- **Categories** — full CRUD (the products form reads live from this, so a category
  added here is immediately selectable when creating a product)
- **Orders** — shows real customer orders (placed via checkout) merged with demo
  data, with status updates and delete
- **Coupons, Reviews, Customers, Articles, Settings** — full CRUD with delete
  confirmation modals throughout

### Design
- Custom espresso/brass color system (overrides Tailwind's default palette via
  a single `@theme` block, so it's consistent across every component)
- Variable-weight Vazirmatn font (100–900) for real typographic hierarchy
- Consistent warm color-grade on all photography (`.brand-photo` utility)
- Scroll-reveal animations, hover motion on product cards, subtle steam
  animation on the hero illustration
- RTL-first, fully responsive

---

## 🛠️ Tech Stack

| Layer | Choice |
|---|---|
| UI | React 19, React Router 7 |
| Styling | Tailwind CSS v4 (CSS-first `@theme`, no config file needed) |
| Forms & validation | React Hook Form + Zod |
| State | React Context API (no Redux — see *Architecture notes* below) |
| Charts | Recharts (admin dashboard) |
| Icons | react-icons (Font Awesome + Heroicons v2) |
| Persistence | `localStorage` (this project has no backend — see *Known limitations*) |
| Tooling | Vite, ESLint |

---

## 📂 Project Structure

```
src/
├── assets/            fonts, images
├── components/
│   ├── admin/          admin-only UI (tables, forms, dashboard widgets)
│   ├── checkout/        checkout form + summary
│   ├── layout/          headers, footers, sidebars for public/admin
│   ├── shared/          route guards (ProtectedRoute, GuestRoute)
│   ├── shop/            product card, cart item, star rating, etc.
│   └── ui/              generic building blocks (modals, Reveal, form shells)
├── constants/          static lookup data (statuses, product categories)
├── context/            Auth, Cart, Order, Product, Category, Toast
├── data/                seed/demo data (products, orders, reviews, blog posts...)
├── pages/
│   ├── admin/           every /admin/* route
│   ├── auth/            sign in / sign up
│   └── public/          every customer-facing route
├── utils/               formatPrice, calculateFinalPrice, normalizeOrder...
├── validation/          Zod schemas
└── routes.jsx           the single source of truth for all routes
```

---

## 🧠 Architecture notes

A few deliberate decisions, for anyone reviewing this project:

- **Context API instead of Redux/Zustand.** The app has clear, mostly-independent
  domains (auth, cart, products, categories, orders, toasts) — each gets its own
  context instead of one global store. It keeps things simple and readable at
  this scale, at the cost of not scaling as gracefully to a much larger app.
- **`localStorage` as a mock backend.** Every context persists to
  `localStorage` and rehydrates on load, so the app behaves like it has a real
  backend during a demo/review — refresh the page and your cart, products,
  and orders are still there. `src/utils/normalizeOrder.js` exists specifically
  to reconcile the shape of a "real" order (placed through checkout) with the
  static seed data shown by default, so both render identically in the admin
  table.
- **One `routes.jsx`, not nested route files.** All routes live in a single
  file so the whole app's routing can be understood in one read, rather than
  hunting across a routes folder.
- **Tailwind v4's `@theme`.** The whole color identity is defined once, by
  overriding Tailwind's built-in `amber` scale — every `bg-amber-800` /
  `text-amber-500` class already used across ~30 components automatically
  picks up the new palette, with zero per-component changes.

---

## 📸 Screenshots


![Home page](/src/assets/images/Preview/Home-Banner.png)`.

---

## 📦 Getting started

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

```bash
npm run build     # production build
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

> **Resetting demo data:** everything is stored in your browser's
> `localStorage`. To start fresh, open DevTools → Application → Local Storage
> → clear the site's data, then refresh.

---

## 🚧 Known limitations / roadmap

This is a frontend-only portfolio project — there's no real server, so:

- Data doesn't sync across devices/browsers (it's all `localStorage`)
- Payment is simulated, not connected to a real gateway
- No real authentication/authorization (client-side only — don't reuse this
  auth flow as-is for anything with real user data)

Possible next steps: a real backend (Node/Express or Supabase), a payment
gateway sandbox integration, and English/Persian language toggle.

---

## 👨‍💻 Author

**Yekta Akhavan**
