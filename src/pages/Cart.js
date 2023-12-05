import { useProductContext } from "../context/productContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthValue } from "../context/AuthContext";
import { CartItem } from "../components/CartItem";

export function Cart() {
  const { cart, total, itemInCart, clearCart, purchaseAll } =
    useProductContext();
  console.log(cart, total, itemInCart, clearCart);

  const navigate = useNavigate();

  const { currentUser } = useAuthValue();
  console.log(currentUser.name);

  function handlePurchase() {
    if (itemInCart === 0) {
      toast.error("Cart is Empty");
      return;
    } else {
      purchaseAll();
      toast.success("Purchase Successful");
      navigate("/myorders");
    }
  }

  return (
    <>
      <div className="mt-16 mb-4 flex justify-between">
        <div className="bg-gray-200 shadow-md rounded-md p-4 flex-1 mr-2">
          <div className="mb-4">
            <h1 className="text-2xl font-bold">
              Hey {currentUser.name},
              <small className="text-sm">Your Cart Has</small>
            </h1>
          </div>
          <div className="mb-4">
            Item:{itemInCart}
            <br />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
          <div>
            Total Amount : ₹{total}
            <br />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md mt-2"
              onClick={handlePurchase}
            >
              Purchase All
            </button>
          </div>
        </div>
        <div className="bg-gray-200 shadow-md rounded-md p-4 flex-1 ml-2">
          {cart && cart.length === 0 ? (
            <h1 className="text-2xl font-bold">Nothing in Your Cart !!!</h1>
          ) : (
            cart &&
            cart.map((product, i) => <CartItem key={i} product={product} />)
          )}
        </div>
      </div>
    </>
  );
}
