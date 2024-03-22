import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiChat,
  HiFolderAdd,
  HiHeart,
  HiMinusCircle,
  HiOutlineBriefcase,
  HiPaperClip,
  HiPlusCircle,
  HiRefresh,
  HiShieldExclamation,
  HiShoppingBag,
  HiShoppingCart,
  HiStar,
  HiTrash,
  HiUser,
} from "react-icons/hi";
import { useLocation, Link, useNavigate } from "react-router-dom";
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
  const [page, setPage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const pageFromUrl = urlParams.get("page");
    if (pageFromUrl) {
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

  const handleDeleteSeller = async () => {
    dispatch(deleteUserStart());
    try {
      const res = await fetch(`/api/user/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        navigate("/sellercenter?tab=auth&role=seller");
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  return (
    <>
      <Sidebar
        aria-label="Sidebar with content separator example"
        className="w-full md:w-56"
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <span className="text-lg font-semibold ">Your Account</span>
            <Link to={"?page=profile"}>
              <Sidebar.Item
                className="my-3"
                icon={HiUser}
                active={page === "profile"}
              >
                My Profile
              </Sidebar.Item>
            </Link>
            <Link to={"?page=products"}>
              <Sidebar.Item
                className="my-3"
                icon={HiShoppingBag}
                active={page === "products"}
              >
                My Products
              </Sidebar.Item>
            </Link>
            <Link to={"?page=create-product"}>
              <Sidebar.Item
                className="my-3"
                icon={HiPlusCircle}
                active={page === "create-product"}
              >
                Add Products
              </Sidebar.Item>
            </Link>
            <Link to={"?page=addProperties"}>
              <Sidebar.Item
                className="my-3"
                icon={HiFolderAdd}
                active={page === "addProperties"}
              >
                Add Proporties
              </Sidebar.Item>
            </Link>
            <Link to={"?page=create-coupon"}>
              <Sidebar.Item
                className="my-3"
                icon={HiMinusCircle}
                active={page === "create-coupon"}
              >
                Create Coupon
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
              onClick={handleDeleteSeller}
            >
              Delete My account
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
}
