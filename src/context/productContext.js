import { createContext, useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { db } from "../firebaase/firebaseInit";

import { useAuthValue } from "./AuthContext";

import { data } from "../utils/data";
import {
  updateDoc,
  doc,
  onSnapshot,
  getDoc,
  setDoc,
  arrayRemove,
} from "firebase/firestore";

export const productContext = createContext();

export function useProductContext() {
  const value = useContext(productContext);
  return value;
}

export function ProductContext({ children }) {
  const { currentUser } = useAuthValue();
  const [cart, setCart] = useState([]);
  // console.log(cart );
  const [total, setTotal] = useState(0);
  const [itemInCart, setItemInCart] = useState(0);
  const [myorders, setMyOrders] = useState([]);

  const updateCart = (newCart) => {
    setCart(newCart);
    let sum = 0;
    newCart.map((item) => Number((sum += item.price)));
    setTotal(sum);
    setItemInCart(newCart.length);
  };

  // get date in dd/mm/yyyy format
  function getDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    if (currentUser) {
      const unsub = onSnapshot(doc(db, "Items", currentUser.uid), (doc) => {
        if (doc.exists()) {
          updateCart(doc.data().cart);
        }
      });
    }
  }, [currentUser]);

  // ? getting real time data for cart from firebase
  // useEffect(() => {
  //     // check whether user is logged in or not
  //     if (currentUser) {
  //       // getting real-time update of data
  //       const unsub = onSnapshot(doc(db, "Items", currentUser.id), (doc) => {
  //         if (doc.exists()) {
  //           // storing all the data in cart
  //           const data = doc.data();
  //           const cartData = data.cart;
  //           setCart(cartData);
  //           setMyOrders(data.orders);

  //           // total amount of products in cart
  //           let sum = 0;
  //           cartData.forEach((item) => {
  //             sum += item.price * item.quantity;
  //           });
  //           setTotal(sum);
  //           setItemInCart(cartData.length);
  //         }
  //       });

  //       // Cleanup function to prevent memory leaks
  //       return () => unsub();
  //     }
  //   }, [currentUser]);

  async function addToCart(product) {
    if (!currentUser) {
      toast.error("Please Login First");
      return;
    }

    const cartRef = doc(db, "Items", currentUser.uid);
    const cartSnap = await getDoc(cartRef);

    if (!cartSnap.exists()) {
      // Document doesn't exist, initialize it
      await setDoc(cartRef, { cart: [{ quantity: 1, ...product }] });
      toast.success("Product added to cart");
    } else {
      let cartData = cartSnap.data().cart;

      const index = cartData.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        // Product already in cart, increase quantity
        cartData[index].quantity += 1;
        toast.success("Product quantity increased");
      } else {
        // Product not in cart, add it
        cartData.push({ quantity: 1, ...product });
        toast.success("Product added to cart");
      }

      // Update the cart in Firebase
      await updateDoc(cartRef, { cart: cartData });
    }

    // Update total and item count
    setTotal(Number(total + product.price));
    setItemInCart(itemInCart + 1);
  }

  function clearCart() {
    setCart([]);
    setTotal(0);
    setItemInCart(0);
  }

  async function purchaseAll() {
    if (currentUser && cart.length > 0) {
      const currentDate = getDate();
      const userRef = doc(db, "Items", currentUser.uid);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        const newOrders = userData.orders
          ? [
              ...userData.orders,
              { date: currentDate, list: cart, amount: total },
            ]
          : [{ date: currentDate, list: cart, amount: total }];

        await updateDoc(userRef, {
          orders: newOrders,
        });

        clearCart();
      } else {
        console.error("No such user!");
      }
    }
  }

  async function increaseQuant(product) {
    const newCart = [...cart];
    const index = newCart.findIndex((item) => item.name === product.name);
    newCart[index].quantity++;
    setCart(newCart);

    const userRef = doc(db, "Items", currentUser.uid);
    await updateDoc(userRef, {
      cart: newCart,
    });

    setItemInCart(itemInCart + 1);
    setTotal(Number(total + newCart[index].price));
  }

  async function decreaseQuant(product) {
    const newCart = [...cart];
    const index = newCart.findIndex((item) => item.name === product.name);
    setTotal(Number(total - newCart[index].price));

    if (newCart[index].quantity > 1) {
      newCart[index].quantity--;
    } else {
      newCart.splice(index, 1);
    }

    setCart(newCart);
    setItemInCart(itemInCart - 1);

    const userRef = doc(db, "Items", currentUser.uid);
    await updateDoc(userRef, {
      cart: newCart,
    });
  }

  async function removeFromCart(product) {
    // update database
    const userRef = doc(db, "Items", currentUser.uid);
    await updateDoc(userRef, {
      cart: arrayRemove(product),
    });
    // reduce item count and total amount
    setTotal(Number(total - product.quantity * product.price));
    setItemInCart(itemInCart - product.quantity);
    toast.success("Removed from Cart!!");
  }

  return (
    <>
      <productContext.Provider
        value={{
          data,
          addToCart,
          cart,
          total,
          setTotal,
          clearCart,
          itemInCart,
          purchaseAll,
          myorders,
          increaseQuant,
          decreaseQuant,
          removeFromCart,
        }}
      >
        {children}
      </productContext.Provider>
    </>
  );
}
