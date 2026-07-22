import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext.jsx";
import CartProvider from "./context/CartContext.jsx";
import OrderProvider from "./context/OrderContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import { CategoryProvider } from "./context/CategoryContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <ProductProvider>
            <CategoryProvider>
              <App />
            </CategoryProvider>
          </ProductProvider>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>,
);
