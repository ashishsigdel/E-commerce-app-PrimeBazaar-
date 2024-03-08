import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiChat,
  HiFolderAdd,
  HiHeart,
  HiOutlineBackspace,
  HiOutlineBriefcase,
  HiPlusCircle,
  HiReceiptRefund,
  HiReceiptTax,
  HiRefresh,
  HiShieldExclamation,
  HiShoppingBag,
  HiShoppingCart,
  HiStar,
  HiTrash,
  HiUser,
} from "react-icons/hi";
import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/user/userSlice";
import { FaShoppingBag } from "react-icons/fa";

export default function SideBar() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
    <>
      {currentUser.role === "user" ? (
        <Sidebar
          aria-label="Sidebar with content separator example"
          className="w-full md:w-56"
        >
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <span className="text-lg font-semibold ">Manage my Profile</span>
              <Link to={"?tab=profile"}>
                <Sidebar.Item
                  className="my-3"
                  icon={HiUser}
                  active={tab === "profile"}
                >
                  My Profile
                </Sidebar.Item>
              </Link>
              <span className="text-lg font-semibold ">My Activities</span>

              <Link to={"?tab=order-status"}>
                <Sidebar.Item
                  className="my-3"
                  icon={HiShoppingCart}
                  active={tab === "order-status"}
                >
                  My Orders
                </Sidebar.Item>
              </Link>
              <Link to={"?tab=purchases"}>
                <Sidebar.Item
                  className="my-3"
                  icon={HiOutlineBriefcase}
                  active={tab === "purchases"}
                >
                  My Purchases
                </Sidebar.Item>
              </Link>
              <Link to={"?tab=canceled"}>
                <Sidebar.Item
                  className="my-3"
                  icon={HiShieldExclamation}
                  active={tab === "canceled"}
                >
                  My Cancel
                </Sidebar.Item>
              </Link>
              <Sidebar.Item href="#" className="my-3" icon={HiStar}>
                My Reviews
              </Sidebar.Item>
              <Link to={"?tab=wishlists"}>
                <Sidebar.Item
                  className="my-3"
                  icon={HiHeart}
                  active={tab === "wishlists"}
                >
                  My Wishlists
                </Sidebar.Item>
              </Link>
            </Sidebar.ItemGroup>

            <Sidebar.ItemGroup>
              <Sidebar.Item
                className="my-3"
                icon={HiTrash}
                onClick={handleDeleteUser}
              >
                Delete My account
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      ) : (
        <Sidebar
          aria-label="Sidebar with content separator example"
          className="w-full md:w-56"
        >
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <span className="text-lg font-semibold ">Your Account</span>
              <Link
                to={"/sellercenter?tab=dashboard&page=profile&role=seller#"}
              >
                <Sidebar.Item
                  className="my-3"
                  icon={HiUser}
                  active={page === "profile"}
                >
                  My Profile
                </Sidebar.Item>
              </Link>
              <Link
                to={"/sellercenter?tab=dashboard&page=products&role=seller"}
              >
                <Sidebar.Item
                  className="my-3"
                  icon={HiShoppingBag}
                  active={page === "products"}
                >
                  My Products
                </Sidebar.Item>
              </Link>
              <Link
                to={
                  "/sellercenter?tab=dashboard&page=create-product&role=seller"
                }
              >
                <Sidebar.Item
                  className="my-3"
                  icon={HiPlusCircle}
                  active={page === "create-product"}
                >
                  Add Products
                </Sidebar.Item>
              </Link>
              <Link
                to={
                  "/sellercenter?tab=dashboard&page=addProperties&role=seller"
                }
              >
                <Sidebar.Item
                  className="my-3"
                  icon={HiFolderAdd}
                  active={page === "addProperties"}
                >
                  Add Proporties
                </Sidebar.Item>
              </Link>
              <Sidebar.Item href="#" className="my-3" icon={HiRefresh}>
                Order Requests
              </Sidebar.Item>
              <Sidebar.Item href="#" className="my-3" icon={HiChat}>
                Review Comments
              </Sidebar.Item>
              <Sidebar.Item href="#" className="my-3" icon={HiOutlineBriefcase}>
                Delevered Progress
              </Sidebar.Item>
            </Sidebar.ItemGroup>

            <Sidebar.ItemGroup>
              <Sidebar.Item
                className="my-3"
                icon={HiTrash}
                onClick={handleDeleteUser}
              >
                Delete My account
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      )}
    </>
  );
}
