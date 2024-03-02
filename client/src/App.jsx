import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import { PrivateRoute, PrivateRouteSeller } from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import PageController from "./pages/seller/PageController";
import Product from "./pages/Product";
import ProductSeller from "./pages/seller/Product";
import Cart from "./pages/Cart";
import OrderDetail from "./components/OrderDetail";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PublicRoute />}>
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order/:orderId" element={<OrderDetail />} />
        </Route>
        <Route element={<PrivateRouteSeller />}>
          <Route
            path="/sellercenter/products/:productSlug"
            element={<ProductSeller />}
          />
        </Route>
        <Route path="/sellercenter" element={<PageController />} />
        <Route path="/products/:productSlug" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}
