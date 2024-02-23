import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import PageController from "./pages/seller/PageController";
import Product from "./pages/Product";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <BrowserRouter>
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
        </Route>
        <Route path="/sellercenter" element={<PageController />} />
        <Route path="/products/:productSlug" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}
