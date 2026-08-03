import { lazy } from "react";

import PublicLayout from "./components/layout/PublicLayout";
import AdminLayout from "./components/layout/AdminLayout";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import GuestRoute from "./components/shared/GuestRoute";

// SHOP PAGE — lazy-loaded so each route ships its own chunk instead of
// one large bundle for the whole app.
const HomePage = lazy(() => import("./pages/public/HomePage"));
const ShopPage = lazy(() => import("./pages/public/ShopPage"));
const BlogPage = lazy(() => import("./pages/public/BlogPage"));
const AboutPage = lazy(() => import("./pages/public/AboutPage"));
const ContactPage = lazy(() => import("./pages/public/ContactPage"));
const CartPage = lazy(() => import("./pages/public/CartPage"));
const ProductDetailPage = lazy(() =>
  import("./pages/public/ProductDetailPage"),
);
const CheckOutPage = lazy(() => import("./pages/public/CheckOutPage"));
const PaymentPage = lazy(() => import("./pages/public/PaymentPage"));
const OrderSuccessPage = lazy(() =>
  import("./pages/public/OrderSuccessPage"),
);
const ArticlesPage = lazy(() => import("./pages/public/ArticlesPage"));
const ArticleDetailPage = lazy(() =>
  import("./pages/public/ArticleDetailPage"),
);

//AUTH PAGE
const SignInPage = lazy(() => import("./pages/auth/SignInPage"));
const SignUpPage = lazy(() => import("./pages/auth/SignUpPage"));

//ADMIN PAGE
const DashboardPage = lazy(() => import("./pages/admin/DashboardPage"));
const AddProductPage = lazy(() => import("./pages/admin/AddProductPage"));
const ArticlePostPage = lazy(() => import("./pages/admin/ArticlePostPage"));
const CategoryPage = lazy(() => import("./pages/admin/CategoryPage"));
const CouponsPage = lazy(() => import("./pages/admin/CouponsPage"));
const CustomerProfilePage = lazy(() =>
  import("./pages/admin/CustomerProfilePage"),
);
const CustomersPage = lazy(() => import("./pages/admin/CustomersPage"));
const OrderDetailCustomerPage = lazy(() =>
  import("./pages/admin/OrderDetailCustomerPage"),
);
const OrdersPage = lazy(() => import("./pages/admin/OrdersPage"));
const ProductEditPage = lazy(() => import("./pages/admin/ProductEditPage"));
const ProductsPage = lazy(() => import("./pages/admin/ProductsPage"));
const ReviewPage = lazy(() => import("./pages/admin/ReviewPage"));
const SettingPage = lazy(() => import("./pages/admin/SettingPage"));

//NOT FOUND PAGE
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const routes = [
  // ========== فروشگاه (با هدر و فوتر) ==========
  {
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "shop", element: <ShopPage /> },
      { path: "product/:slug", element: <ProductDetailPage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "articles", element: <ArticlesPage /> },
      { path: "articles/:slug", element: <ArticleDetailPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <CheckOutPage />
          </ProtectedRoute>
        ),
      },
      { path: "payment", element: <PaymentPage /> },
      { path: "order-success", element: <OrderSuccessPage /> },
    ],
  },

  // ========== صفحات Auth (بدون هدر و فوتر) ==========
  {
    path: "auth",
    children: [
      {
        path: "sign-in",
        element: (
          <GuestRoute>
            <SignInPage />
          </GuestRoute>
        ),
      },
      {
        path: "sign-up",
        element: (
          <GuestRoute>
            <SignUpPage />
          </GuestRoute>
        ),
      },
    ],
  },

  //   مهمان → اجازه ورود
  // لاگین شده → اجازه ندارد

  // این الگوی استاندارد Auth Flow است.

  // ========== پنل ادمین (با سایدبار) ==========
  {
    path: "admin",
    element: (
      <ProtectedRoute role="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "blog", element: <ArticlePostPage /> },
      { path: "categories", element: <CategoryPage /> },
      { path: "coupons", element: <CouponsPage /> },
      { path: "customers", element: <CustomersPage /> },
      { path: "customer-profile/:id", element: <CustomerProfilePage /> },
      { path: "order-detail/:id", element: <OrderDetailCustomerPage /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "products/edit/:id", element: <ProductEditPage /> },
      { path: "products/add", element: <AddProductPage /> },
      { path: "reviews", element: <ReviewPage /> },
      { path: "settings", element: <SettingPage /> },
    ],
  },

  // ========== 404 ==========
  { path: "*", element: <NotFoundPage /> },
];

export default routes;
