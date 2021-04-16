export const ADD_PRODUCT = "ADD_PRODUCT"
export const DELETE_PRODUCT = "REMOVE_PRODUCT"

const addToCart = (product, userEmail, state) => {
  const updatedCart = [...state.cart];
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

  return { ...state, cart: updatedCart };
}

const deleteCartItem = (productId, state) => {
  console.log("Removing product with id: " + productId);
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === productId
  );

  const updatedItem = {
    ...updatedCart[updatedItemIndex],
  };
  updatedItem.quantity--;
  if (updatedItem.quantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else {
    updatedCart[updatedItemIndex] = updatedItem;
  }
  return { ...state, cart: updatedCart };
}

export const CartReducer = (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addToCart(action.product, action.userEmail, state);
    case DELETE_PRODUCT:
      return deleteCartItem(action.productId, state);
    default:
      return state;
  }
};
