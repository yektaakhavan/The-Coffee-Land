// SHOP PAGE
import PublicLayout from "./components/layout/PublicLayout";
import HomePage from "./pages/public/HomePage";
import ShopPage from "./pages/public/ShopPage";
import BlogPage from "./pages/public/BlogPage";
import AboutPage from "./pages/public/AboutPage";
import ContactPage from "./pages/public/ContactPage";
import CartPage from "./pages/public/CartPage";
import ProductDetailPage from "./pages/public/ProductDetailPage";
import CheckOutPage from "./pages/public/CheckOutPage";
import PaymentPage from "./pages/public/PaymentPage";
import OrderSuccessPage from "./pages/public/OrderSuccessPage";
import ArticlesPage from "./pages/public/ArticlesPage";

//AUTH PAGE
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";

//LOGIN PAGE
import LoginPage from "./pages/admin/LoginPage";

//ADMIN PAGE
import AdminLayout from "./components/layout/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import AddProductPage from "./pages/admin/AddProductPage";
import ArticlePostPage from "./pages/admin/ArticlePostPage";
import CategoryPage from "./pages/admin/CategoryPage";
import CouponsPage from "./pages/admin/CouponsPage";
import CustomerProfilePage from "./pages/admin/CustomerProfilePage";
import CustomersPage from "./pages/admin/CustomersPage";
import OrderDetailCustomerPage from "./pages/admin/OrderDetailCustomerPage";
import OrdersPage from "./pages/admin/OrdersPage";
import ProductEditPage from "./pages/admin/ProductEditPage";
import ProductsPage from "./pages/admin/ProductsPage";
import ReviewPage from "./pages/admin/ReviewPage";
import SettingPage from "./pages/admin/SettingPage";

//NOT FOUND PAGE
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import GuestRoute from "./components/shared/GuestRoute";

const routes = [
  // ========== فروشگاه (با هدر و فوتر) ==========
  {
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "shop", element: <ShopPage /> },
      { path: "product/:slug", element: <ProductDetailPage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "articles-page", element: <ArticlesPage /> },
      { path: "article/:slug", element: <ArticlePostPage /> },
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

  // ========== لاگین ادمین (بدون هدر و فوتر) ==========
  {
    path: "login",
    element: <LoginPage />,
  },

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
      { path: "product-edit/:id", element: <ProductEditPage /> },
      { path: "add-product", element: <AddProductPage /> },
      { path: "reviews", element: <ReviewPage /> },
      { path: "settings", element: <SettingPage /> },
    ],
  },

  // ========== 404 ==========
  { path: "*", element: <NotFoundPage /> },
];

export default routes;
