import React, { createContext, useState } from "react";
import data_product from "../Components/Assets/data";


export const ShopContext = createContext(null);


const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < data_product.length; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  
  const addToCart = (itemID) => {
    setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] + 1 }));
    console.log(cartItems);
  };

  const removeFromCart = (itemID) => {
    setCartItems((prev) => ({ ...prev, [itemID]: Math.max(prev[itemID] - 1, 0) }));
  };

  
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = data_product.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  // Context value to provide
  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    data_product,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
