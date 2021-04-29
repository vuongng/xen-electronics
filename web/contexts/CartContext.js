/* global localStorage */

import { createContext, useReducer, useState, useEffect } from "react";
import { getProducts } from "../pages/api/productService";
import { CartReducer, ADD_PRODUCT, DELETE_PRODUCT, FETCH_CART } from '../reducers/cartReducer'
// import { LocalStorage } from 'node-localstorage'

let initialCart = []

const CartContext = createContext();

const CartProvider = ({ children }) => {

  // const [cart, setCart] = useState([])

  // not available in functional component => only in class base component
  // const componentDidMount = () => {
  //   initialCart = JSON.parse(localStorage.getItem('cart')) ?? []
  // }

  const [cartState, dispatch] = useReducer(CartReducer, { cart: [] })

  useEffect(() => {
    dispatch({ type: FETCH_CART })
  }, [])

  const addToCart = (product) => {
    setTimeout(() => {
      dispatch({
        type: ADD_PRODUCT,
        product: product
      })
    }, 500)
  }

  const deleteCartItem = (productId) => {
    setTimeout(() => {
      dispatch({
        type: DELETE_PRODUCT,
        productId: productId
      })
    }, 500)
  }

  return (
    <CartContext.Provider
      value={{
        cart: cartState.cart,
        addToCart: addToCart,
        deleteCartItem: deleteCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
