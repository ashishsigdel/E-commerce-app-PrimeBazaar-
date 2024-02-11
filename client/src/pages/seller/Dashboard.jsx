import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SideBar from "../../components/SideBar";
import DashProfile from "../../components/DashProfile";
import Header from "./Header";
import CreateProduct from "../../components/seller/CreateProduct";
import UploadImage from "../../components/seller/UploadImage";
import ProductList from "../../components/seller/ProductList";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [page, setPage] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    const pageFromUrl = urlParams.get("page");
    if (tabFromUrl) {
      setTab(tabFromUrl);
      setPage(pageFromUrl);
    }
  }, [location.search]);
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="md:w-56">
          <SideBar />
        </div>
        {page === "profile" && <DashProfile />}
        {page === "create-product" && <CreateProduct />}
        {page === "create-product-images" && <UploadImage />}
        {page === "products" && <ProductList />}
      </div>
    </>
  );
}
