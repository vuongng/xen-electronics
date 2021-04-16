import { createContext, useReducer } from "react";
import { getProducts } from "../pages/api/productService";
import { CartReducer, ADD_PRODUCT, DELETE_PRODUCT } from '../reducers/cartReducer'

const CartContext = createContext({
    cart: [],
    addToCart: product => {},
    deleteCartItem: productId => {}
});

const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(CartReducer, { cart: [] })

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
