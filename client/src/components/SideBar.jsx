import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiHeart,
  HiReceiptRefund,
  HiReceiptTax,
  HiStar,
  HiTrash,
  HiUser,
} from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/user/userSlice";

export default function SideBar() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleDeleteUser = async () => {
    dispatch(deleteUserStart());
    try {
      const res = await fetch(`/api/user/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
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

        <Sidebar.ItemGroup>
          <Sidebar.Item
            href="#"
            className="my-3"
            icon={HiTrash}
            onClick={handleDeleteUser}
          >
            Delete My account
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
