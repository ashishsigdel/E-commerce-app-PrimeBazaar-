import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Label, TextInput } from "flowbite-react";
import { useNavigate, Link } from "react-router-dom";

export default function Cart() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [cartProduct, setCartProduct] = useState({ products: [] }); // Initialize with an empty products array
  console.log(cartProduct);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/user/cart");
        const data = await res.json();
        if (res.ok) {
          setCartProduct(data);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
  }, [currentUser]);

  const applyVoucher = async () => {
    console.log("applying");
  };

  const handleOrder = async () => {
    navigate("/order-status");
  };

  const handleDelete = async (productId) => {
    try {
      const res = await fetch(`/api/user/cart/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        setCartProduct((prevCartProduct) => {
          const updatedProducts = prevCartProduct.products.filter(
            (product) => product.product._id !== productId
          );

          return {
            ...prevCartProduct,
            products: updatedProducts,
          };
        });
      } else {
        console.log(`Failed to remove product from the cart`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/user/cart");
        const data = await res.json();
        if (res.ok) {
          setCartProduct(data);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
  }, [handleDelete]);

  return (
    <>
      {cartProduct !== null && cartProduct.products.length > 0 ? (
        <div className="max-w-6xl bg-white w-full flex flex-col mx-auto my-5 p-2">
          <div className="flex sm:flex-row flex-col sm:gap-10 mx-2">
            <div className="sm:w-2/3 w-full flex items-center justify-center">
              <div className="w-full h-full">
                <h1 className="text-2xl py-3 border-b w-full">
                  Selected Products:{" "}
                </h1>
                {cartProduct.products.map((product) => (
                  <div key={product.id} className="py-4 border-b items-center">
                    <Link
                      to={`/products/${product.product.slug}`}
                      className="flex gap-2 hover:shadow-sm p-3"
                    >
                      <div className="">
                        <img
                          src={product.product.images[0]}
                          alt={product.product.title}
                          className="h-20 w-20 object-contain"
                        />
                      </div>
                      <div className="flex sm:flex-row ml-10 flex-col justify-between">
                        <div>
                          <h1 className="sm:text-xl line-clamp-2">
                            {product.product.title}
                          </h1>
                          <p className="text-gray-400">{`Color: ${product.product.color}`}</p>
                          <div className="flex gap-10 items-center">
                            <p className="text-orange-500 text-2xl">{`Rs. ${product.product.price}`}</p>
                            <div className="w-10 h-10  flex items-center justify-center gap-1">
                              <p className="bg-slate-100 px-3 py-2 rounded-md">
                                {product.count}
                              </p>
                              <p> items</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleDelete(product.product._id)}
                        className="button "
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="sm:w-1/3 w-full flex items-center justify-center">
              <div className="w-full h-full flex flex-col gap-2">
                <h1 className="text-xl py-3 w-full">Order Summary: </h1>
                <p className="text-gray-400">{`Subtotal (${cartProduct.products.length} items)`}</p>
                <form
                  onSubmit={applyVoucher}
                  className="flex gap-3 items-center justify-between"
                >
                  <TextInput
                    id="coupon"
                    type="text"
                    placeholder="Enter Voucher Code"
                  />
                  <Button type="submit" gradientMonochrome="success">
                    Apply
                  </Button>
                </form>
                <div className="flex justify-between mt-3 border-t pt-3 items-center">
                  <p>Total</p>
                  <p className="text-2xl text-orange-500">
                    Rs. {cartProduct.cartTotal}
                  </p>
                </div>
                <button onClick={handleOrder} className="button my-5">
                  Create Order
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="m-5 p-3">
          <p className="text-2xl text-red-500">You have no product in cart.</p>
        </div>
      )}
    </>
  );
}
