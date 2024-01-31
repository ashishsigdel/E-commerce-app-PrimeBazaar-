import { Dropdown, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-orange-500 text-white shadow-md">
      <div className="flex-col gap-2 sm:mx-auto max-w-6xl pb-3 pt-3 sm:pt-0 mx-2">
        <div className="sm:flex hidden">
          <Link to={"/sign-in/admin"} className="text-sm text-white my-1">
            <span>Become a seller</span>
          </Link>
          <Link
            to={"/payment-recharge"}
            className="text-sm text-white mx-3 my-1"
          >
            <span>Payment & Recharge</span>
          </Link>
          <Link to={"/help-center"} className="text-sm text-white mx-3 my-1">
            <span>Help & Support</span>
          </Link>
          <Link
            to={"/primebazaar-partner"}
            className="text-sm text-white mx-3 my-1"
          >
            <span>PrimeBazaar Logistics Partner</span>
          </Link>
        </div>

        <div className="flex gap-5 items-center justify-between">
          <div>
            <img
              src="https://i.postimg.cc/3N7SXc2s/logo-no-background.png"
              alt="PrimeBazaar"
              className="w-52 hidden md:inline"
            />
            <img
              src="https://i.postimg.cc/s28k0Skm/logo-only-no-background.png"
              alt="PB"
              className="p-1 w-10 md:hidden inline"
            />
          </div>
          <div className="hidden md:inline">
            <Dropdown label="Categories" inline>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
          </div>
          <form>
            <input
              type="text"
              className="rounded-lg h-8 sm:w-[550px] w-36 active:outline-none border-none text-gray-600"
            />
          </form>
          <div className="flex gap-2">
            <FaRegUser size={20} />
            <Link to="/sign-in">Login</Link>
          </div>
          <div className="flex gap-2">
            <span className="mr-3"> | </span>
            <Link to="/sign-up" className="mr-2">
              Signup
            </Link>
          </div>
          <div className="hidden sm:inline">
            <HiOutlineShoppingCart size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}
