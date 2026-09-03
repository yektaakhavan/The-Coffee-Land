# ☕ The Coffee Land

A full-featured coffee shop e-commerce application built with **React 19** on
the frontend and a **real Node.js REST API** on the backend — a complete
**customer storefront** and a **fully functional admin dashboard**, wired
end-to-end to an actual Postgres database (a real order placed at checkout
shows up in the admin panel because it *is* the same database, not mock data).

---

## ✨ Features

### Customer-facing storefront
- Home, About, Contact, Shop, Product detail, Cart, Checkout, Order success
- Blog / articles with individual article pages
- Product search, category filter, price range filter, and sorting (price / rating)
- Cart with quantity controls, discount calculation, and free-shipping threshold
- Checkout form with full client-side validation (React Hook Form + Zod)
- Toast notifications (e.g. "added to cart") — no page reload, no external UI library
- Auth: sign up / sign in with real server-side sessions (JWT), protected &
  guest-only routes, role-based access (admin vs customer)

### Admin dashboard
- Dashboard with sales chart, recent orders, and quick actions
- **Products** — create/edit with full form validation, image, pricing, inventory
- **Categories** — full CRUD (the products form reads live from this, so a category
  added here is immediately selectable when creating a product)
- **Orders** — real customer orders, placed via checkout and stored in Postgres,
  with status updates and delete
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

### Frontend
| Layer | Choice |
|---|---|
| UI | React 19, React Router 7 |
| Styling | Tailwind CSS v4 (CSS-first `@theme`, no config file needed) |
| Forms & validation | React Hook Form + Zod |
| State | React Context API, talking to the real API (see *Architecture notes*) |
| Charts | Recharts (admin dashboard) |
| Icons | react-icons (Font Awesome + Heroicons v2) |
| Testing | Vitest + React Testing Library (unit + component tests) |
| Tooling | Vite, ESLint |

### Backend (https://github.com/yektaakhavan/coffee-land-backend)
| Layer | Choice |
|---|---|
| Runtime | Node.js, deployed as Vercel Serverless Functions |
| Database | Postgres |
| Auth | JWT + bcrypt (server-side password hashing, never stored or compared in plain text) |
| Deployment | Vercel |

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
├── context/            Auth, Cart, Order, Product, Category, Toast — all
│                        talk to the backend API (see lib/api.js)
├── lib/
│   └── api.js           thin fetch wrapper for every backend call, handles
│                        the JWT auth header and error normalization
├── data/                seed/demo data still used for a few non-critical
│                        sections (blog posts, reviews)
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
- **Real backend, adapter pattern in the contexts.** Each context (`ProductContext`,
  `OrderContext`, etc.) fetches from the real API through `src/lib/api.js`, then
  maps the API's response shape (e.g. Postgres's `category_id`, `total_price`)
  into the shape the rest of the app already expects (e.g. `category.title`,
  `totalPrice`). This kept the UI components themselves untouched when the
  backend was added — only the context layer changed.
- **Prices are never trusted from the client.** When an order is placed, the
  backend looks up each product's real price from the database itself — it
  never uses a price sent by the frontend. This closes an obvious attack
  vector (submitting a fake, lower price at checkout).
- **Stock safety via database transactions.** Placing an order runs inside a
  real Postgres transaction with row-level locking (`SELECT ... FOR UPDATE`),
  so two customers can't both successfully buy the last unit of a product at
  the same time.
- **`src/utils/normalizeOrder.js`** reconciles the shape of a live order
  (placed through checkout, from the backend) with the shape of static demo
  orders still used to pad out a couple of admin views, so both render
  identically in the admin table.
- **One `routes.jsx`, not nested route files.** All routes live in a single
  file so the whole app's routing can be understood in one read, rather than
  hunting across a routes folder.
- **Tailwind v4's `@theme`.** The whole color identity is defined once, by
  overriding Tailwind's built-in `amber` scale — every `bg-amber-800` /
  `text-amber-500` class already used across ~30 components automatically
  picks up the new palette, with zero per-component changes.

---

## 🧪 Testing & quality

- **Unit tests** for pricing and order-normalization logic
  (`calculateFinalPrice`, `formatPrice`, `normalizeOrder`) — written while
  fixing a real bug (a negative discount was silently *increasing* the price
  instead of being rejected; now clamped and covered by a regression test).
- **Component tests** for `ProductCard` (price/discount display, out-of-stock
  state, correct product link, image lazy-loading).
- Run with `npm run test`.

## 🔒 Security notes

- Passwords are hashed server-side with **bcrypt** — never stored or compared
  as plain text.
- **JWT**-based sessions; the token is sent as a `Bearer` header on every
  authenticated request.
- Order totals are **always computed server-side** from the product catalog,
  never trusted from the client.
- Role-based access control: only an authenticated admin can create/edit/
  delete products, categories, or change order status.

## ⚡ Performance notes

- Route-based code splitting (`React.lazy`) — admin routes aren't downloaded
  by a customer who never visits `/admin`.
- Product images use native `loading="lazy"` and `decoding="async"`.
- `ProductCard` is wrapped in `React.memo` to avoid re-rendering unchanged
  cards inside product list/grid views.

---

## 📸 Screenshots

![Home page](/src/assets/images/Preview/Home-Banner.png)

---

## 📦 Getting started

### Frontend
```bash
npm install
cp .env.example .env
# set VITE_API_URL in .env to your backend's URL
npm run dev
```
Then open `http://localhost:5173`.

```bash
npm run build     # production build
npm run preview   # preview the production build locally
npm run test       # run the test suite
npm run lint       # run ESLint
```

### Backend
The backend lives in a separate repository — see its own README for setup
(Postgres schema, environment variables, and Vercel deployment steps).

---

## 🚧 Roadmap

- Payment gateway sandbox integration (checkout is currently simulated)
- Direct image upload in the admin panel (product images currently need a
  hosted URL — see the backend README for the current workaround)
- Phone-number login (only email login is implemented server-side today)
- English/Persian language toggle

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%" alt="section divider" />

## 👨‍💻 Author

**Yekta Akhavan**

<p align="center">
  <a href="mailto:yekta.akhavan.dev@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-yekta.akhavan.dev%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white&labelColor=0D1117" alt="Email" />
  </a>
  &nbsp;
  <a href="https://www.linkedin.com/in/yekta-akhavan/">
    <img src="https://img.shields.io/badge/LinkedIn-Yekta%20Akhavan-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white&labelColor=0D1117" alt="LinkedIn" />
  </a>
  &nbsp;
  <a href="https://www.instagram.com/yektaakhavan.dev?igsi=d2Vya2RqazhqZ2Z2">
    <img src="https://img.shields.io/badge/Instagram-yekta--akhavan-E4405F?style=for-the-badge&logo=instagram&logoColor=white&labelColor=0D1117" alt="Instagram" />
  </a>
  &nbsp;
  <a href="https://yekta-akhavan.vercel.app/">
    <img src="https://img.shields.io/badge/Portfolio-yekta--akhavan.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white&labelColor=0D1117" alt="Portfolio" />
  </a>
</p>
