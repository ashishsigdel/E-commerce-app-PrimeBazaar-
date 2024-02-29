import React, { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

export default function Stepper({ order }) {
  const { currentUser } = useSelector((state) => state.user);
  const steps = ["Processing", "Dispatched", "Delivered"];
  const initialStep =
    order.orderStatus === "Processing"
      ? 2
      : order.orderStatus === "Dispatched"
      ? 3
      : order.orderStatus === "Delivered"
      ? 4
      : 1;
  const isComplete = order.orderStatus === "Delivered" ? true : false;
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [complete, setComplete] = useState(isComplete);
  console.log(currentStep, complete);

  return (
    <>
      <div className="flex justify-between mx-auto">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`relative flex flex-col justify-center items-center w-36 step-item ${
              currentStep === i + 1 && "active"
            } ${(i + 1 < currentStep || complete) && "complete"} `}
          >
            <div className="w-10 h-10 flex items-center justify-center z-10 relative bg-slate-700 rounded-full font-semibold text-white step">
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="text-gray-500">{step}</p>
          </div>
        ))}
      </div>

      <div className="flex w-full sm:flex-row flex-col border shadow-lg mt-10 py-5 gap-3">
        <div className="flex w-full items-center px-5">
          <img
            src={order.products[0].product.images[0]}
            alt={order.products[0].product.images[0]}
            className="w-20 h-20 object-cover"
          />
          <div className="ml-3">
            <h1 className="line-clamp-2 text-xl">
              {order.products[0].product.title}
            </h1>
            <p className="text-gray-500">
              Price: Rs. {order.products[0].product.price}
            </p>
            <p className="text-gray-500">Color: {order.products[0].color}</p>
            <p className="text-gray-500">Quantity: {order.products[0].count}</p>
          </div>
        </div>
        <div className="flex flex-col justify-end mx-5">
          <button
            disabled={isComplete || currentStep === 3}
            className={`button ${
              isComplete || currentStep === 3 ? "disabled:bg-gray-500" : ""
            }`}
          >
            {isComplete
              ? "Delivered!"
              : currentStep === 3
              ? "Unable to cancel"
              : "Cancel"}
          </button>
        </div>
      </div>
      <div className="flex w-full sm:flex-row flex-col border shadow-lg my-2 py-5 gap-3">
        <div className="flex-1 w-full items-center px-5 border-r">
          <div className="ml-3">
            <h1 className="line-clamp-2 text-xl">Delivery Address</h1>
            <p className="text-gray-700 line-clamp-3">{currentUser.address}</p>
            <p className="text-gray-500">Phone: {currentUser.mobile}</p>
          </div>
        </div>
        <div className="flex-1 flex-col justify-end pr-5">
          <div className="flex-1 w-full items-center px-5">
            <div className="ml-3">
              <h1 className="line-clamp-2 text-xl">Total Summary</h1>
              <p className="text-gray-700 line-clamp-3">
                Payment:{" "}
                {order.paymentIntent.method === "COD" && "Cash On Delivery"}
              </p>
              <p className="text-gray-700 line-clamp-3">
                Total: {order.paymentIntent.currency}
                {order.paymentIntent.amount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
