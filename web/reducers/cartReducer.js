import { useEffect } from 'react'

export const ADD_PRODUCT = 'ADD_PRODUCT'
export const DELETE_PRODUCT = 'REMOVE_PRODUCT'
export const FETCH_CART = 'FETCH_CART'

const addToCart = (product, userEmail, state) => {
  const updatedCart = [...state.cart]

  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === product.id
  );

  if (updatedItemIndex < 0) {
    updatedCart.push({ ...product, quantity: 1 });
  } else {
    const updatedItem = {
      ...updatedCart[updatedItemIndex],
    };
    updatedItem.quantity++;
    updatedCart[updatedItemIndex] = updatedItem;
  }

  localStorage.setItem('cart', JSON.stringify(updatedCart))

  return { ...state, cart: updatedCart };
}

const deleteCartItem = (productId, state) => {
  console.log("Removing product with id: " + productId);
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === productId
  )

  const updatedItem = {
    ...updatedCart[updatedItemIndex],
  }

  updatedItem.quantity--;
  if (updatedItem.quantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else {
    updatedCart[updatedItemIndex] = updatedItem;
  }

  localStorage.setItem('cart', JSON.stringify(updatedCart))

  return { ...state, cart: updatedCart }
}

const fetchCartFromLocalStorage = (state) => {
  const initialCart = JSON.parse(localStorage.getItem('cart')) ?? []

  return { ...state, cart: initialCart }
}

export const CartReducer = (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addToCart(action.product, action.userEmail, state)
    case DELETE_PRODUCT:
      return deleteCartItem(action.productId, state)
    case FETCH_CART:
      return fetchCartFromLocalStorage(state)
    default:
      return state
  }
};
