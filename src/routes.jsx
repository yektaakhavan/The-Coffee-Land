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
import SignInPage from "./pages/public/SignInPage";
import SignUpPage from "./pages/public/SignUpPage";

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
import AuthContext from "./pages/admin/AuthContext";

const routes = [
  // SHOP PAGE
  {
    path: "/", 
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/shop", element: <ShopPage /> },
      { path: "/product/:slug", element: <ProductDetailPage /> },
      { path: "/blog", element: <BlogPage /> },
      { path: "/articles-page", element: <ArticlesPage /> },
      { path: "/article/:slug", element: <ArticlePostPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkOut", element: <CheckOutPage /> },
      { path: "/payment", element: <PaymentPage /> },
      { path: "/order-success", element: <OrderSuccessPage /> },
      { path: "/sign-in", element: <SignInPage /> },
      { path: "/sign-up", element: <SignUpPage /> },
    ],
  },

  //LOGIN PAGE
  {
    path: "/login",
    element: <LoginPage />,
  },

  //ADMIN PAGE
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "Auth-context", element: <AuthContext /> },
      { path: "blog", element: <ArticlePostPage /> },
      { path: "categories", element: <CategoryPage /> },
      { path: "coupons", element: <CouponsPage /> },
      { path: "customers", element: <CustomersPage /> },
      { path: "customer-profile", element: <CustomerProfilePage /> },
      { path: "order-detail", element: <OrderDetailCustomerPage /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "product-edit", element: <ProductEditPage /> },
      { path: "add-Product", element: <AddProductPage /> },
      { path: "reviews", element: <ReviewPage /> },
      { path: "settings", element: <SettingPage /> },
    ],
  },

  //NOT FOUND PAGE
  { path: "*", element: <NotFoundPage /> },
];
export default routes;
