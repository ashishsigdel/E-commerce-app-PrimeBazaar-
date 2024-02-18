import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  IoBusOutline,
  IoHeart,
  IoHeartOutline,
  IoLocation,
  IoServerOutline,
  IoShareSocialOutline,
  IoStar,
  IoStarOutline,
} from "react-icons/io5";
import { GiMoneyStack, GiShieldDisabled } from "react-icons/gi";
import ReviewRating from "../components/ReviewRating";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";

export default function Product() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { productSlug } = useParams();
  const [product, setProduct] = useState({
    images: [],
    ratings: [],
  });
  const [user, setUser] = useState({});
  const solidStar = product.totalrating;
  const hollowStar = 5 - solidStar;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/getproduct?slug=${productSlug}`);
        const data = await res.json();
        if (res.ok) {
          setProduct(data.products[0]);
        }
      } catch (error) {
        console.error("Error fetching product:", error.message);
      }
    };

    fetchProduct();
  }, [productSlug]);

  const handleWishlist = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/product/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prodId: product._id }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(updateUserSuccess(data));
      } else {
        dispatch(updateUserFailure(data.message));
      }
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const isProductInWishlist = currentUser.wishlist.includes(product._id);

  return (
    <>
      <div className="max-w-6xl bg-white w-full flex flex-col mx-auto my-5 p-2">
        <div className="flex sm:flex-row flex-col">
          <div className="flex-1">
            <div>
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full"
              />
            </div>
            <div className="flex mx-auto gap-5 w-20 h-20 border-gray-600 mt-3">
              {product.images.map((image, index) => (
                <div key={index} className="w-full h-full">
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-16 h16 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="w-rull sm:w-2/5 py-4 px-3 ">
            <div className="text-2xl">
              <h1 className="font-semibold">{product.title}</h1>
            </div>
            <div className="flex gap-1 my-2 items-center">
              <h1 className="text-blue-400 text-sm">Ratings : </h1>
              <div className="flex">
                {Array.from({ length: solidStar }, (_, index) => (
                  <IoIosStar key={index} className="text-yellow-500" />
                ))}
                {Array.from({ length: hollowStar }, (_, index) => (
                  <IoIosStarOutline key={index} className="text-yellow-500" />
                ))}
              </div>
            </div>
            <div className="flex justify-between gap-5 mb-3">
              <div className="flex gap-1">
                <span className="span2 text-sm">Brand: </span>
                <h1 className="text-blue-400 text-sm">{product.brand}</h1>
              </div>
              <div className="flex gap-1">
                <span className="span2 text-sm">Avaiable: </span>
                <h1 className="text-blue-400 text-sm">{product.quantity}</h1>
              </div>
              <div className="flex gap-4 items-center">
                <IoShareSocialOutline size={20} />
                <div
                  className="span hover:cursor-pointer"
                  onClick={handleWishlist}
                >
                  {isProductInWishlist ? (
                    <IoHeart size={25} className="text-red-500" />
                  ) : (
                    <IoHeartOutline size={25} />
                  )}
                </div>
              </div>
            </div>
            <hr />
            <div className="flex gap-1 mt-3">
              <h1 className="text-2xl font-semibold text-red-500">
                Price: Rs.
              </h1>
              <h1 className="text-2xl font-semibold text-red-500">
                {product.price}
              </h1>
            </div>
            <div className="flex gap-3 my-4 items-center">
              <p className="">Quantity: </p>
              <input
                type="number"
                min={1}
                defaultValue={1}
                max={product.quantity}
              />
            </div>
            <div className="flex gap-3 my-10">
              <button type="button" className="button2 w-full flex-1">
                Buy Now
              </button>
              <button type="button" className="button w-full flex-1">
                Add to Cart
              </button>
            </div>
          </div>
          <div className="flex-1 p-3 bg-slate-100">
            <div className="my-3">
              <span className="span">Delivery: </span>
              {currentUser ? (
                <div>
                  {currentUser.address === undefined ? (
                    <div className="flex gap-2 flex-wrap ">
                      <p>Please provide your address to deliver.</p>
                      <Link to={"/dashboard?tab=profile"}>
                        <p className="text-blue-500 underline">Add</p>
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-2 ">
                        <IoLocation size={20} />
                        <p className="line-clamp-2">{currentUser.address} </p>
                        <Link className="ml-3" to={"/dashboard?tab=profile"}>
                          <p className="text-blue-500 underline">Change</p>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex gap-3 ">
                  <p>Login to purchase.</p>
                  <Link to={"/sign-in"}>
                    <p className="text-blue-500 underline">login</p>
                  </Link>
                </div>
              )}
            </div>
            <div className="my-3 flex flex-col gap-2  ">
              <hr />
              <div className="flex gap-2 items-center">
                <IoBusOutline size={20} />
                <span className="text-black">Delivery Charge:</span>
              </div>
              <p className="p-2 bg-white rounded-lg">
                Enjoy free shipping with minimum spend of Rs. 699.
              </p>
              <div className="flex gap-2 items-center">
                <GiMoneyStack size={20} />
                <span className="text-black">Cash On delivery avaiable.</span>
              </div>
            </div>
            <div className="my-3 flex flex-col gap-2  ">
              <hr />
              <div className="flex gap-2 items-center">
                <IoServerOutline size={20} />
                <span className="text-black">Services:</span>
              </div>
              <div className="p-2 bg-white rounded-lg">
                <p className="">14 days free & easy return.</p>
                <span className="span text-xs">
                  Change of mind is not applicable
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <GiShieldDisabled size={20} />
                <span className="text-black">Warranty not available!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl bg-white w-full flex flex-col mx-auto my-5">
        <div className=" bg-slate-100 p-3 border border-b-1">
          <h3 className="font-semibold text-xl">{`Product details of ${product.title}`}</h3>
        </div>
        <div
          className="p-3 max-w-5xl mx-auto w-full product-content"
          dangerouslySetInnerHTML={{ __html: product && product.description }}
        ></div>
      </div>
      <ReviewRating product={product} />
    </>
  );
}
