import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { BiBuoy } from "react-icons/bi";
import {
  HiHeart,
  HiLocationMarker,
  HiReceiptRefund,
  HiReceiptTax,
  HiStar,
  HiUser,
  HiUserCircle,
} from "react-icons/hi";
import { useLocation } from "react-router-dom";
export default function SideBar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <Sidebar
      aria-label="Sidebar with content separator example"
      className="w-full md:w-56"
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <span className="text-lg font-semibold ">Manage my Profile</span>
          <Sidebar.Item
            href="#"
            className="my-3"
            icon={HiUser}
            active={tab === "profile"}
          >
            My Profile
          </Sidebar.Item>
          <span className="text-lg font-semibold ">My Activities</span>
          <Sidebar.Item href="#" className="my-3" icon={HiReceiptRefund}>
            My Returns
          </Sidebar.Item>
          <Sidebar.Item href="#" className="my-3" icon={HiReceiptTax}>
            My Cancellations
          </Sidebar.Item>
          <Sidebar.Item href="#" className="my-3" icon={HiStar}>
            My Reviews
          </Sidebar.Item>
          <Sidebar.Item href="#" className="my-3" icon={HiHeart}>
            My Wishlists
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
