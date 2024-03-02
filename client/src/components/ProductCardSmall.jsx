import React from "react";

export default function ProductCardSmall({ product }) {
  return (
    <div className="w-[195px] sm:w-[215px]">
      <img
        src={product.images[0]}
        alt={product.images[0]}
        className="w-full aspect-square object-cover"
      />
      <div className="p-2">
        <h1 className="h-12 line-clamp-2">{product.title}</h1>
        <div className="flex gap-2 text-orange-500 text-2xl">
          <p>Price: </p>
          <p>{product.price}</p>
        </div>
        <div className="flex justify-between text-xs">
          <p className="text-yellow-300">{product.totalrating} ratings</p>
          <p className="text-gray-500">{product.sold} solds</p>
        </div>
      </div>
    </div>
  );
}
