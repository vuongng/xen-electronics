import Link from "next/link";
import { useContext } from "react";
import Layout from "../../components/Layout";
import { CartContext } from "../../contexts/CartContext";

const Cart = () => {
  const { cart, deleteCartItem } = useContext(CartContext);

  return (
    <div className="container mx-auto bg-white p-8 flex flex-col flex-wrap">
      {cart.length === 0 && <span>Your cart is empty!</span>}

      {cart.length > 0 && (
        <div>
          <ul>
            {cart.map((item, index) => (
              <li
                className="flex flex-wrap flex-row justify-around items-center py-6"
                key={index}
              >
                <img src={item.imageurl} className="w-24 h-24 object-cover" />
                <div className="flex-shrink-0">
                  <span className="font-medium">{item.name}</span>
                  <span>( {item.quantity} )</span>
                </div>
                <span className="font-semibold">
                  {parseFloat(item.price) * parseInt(item.quantity)} RM
                </span>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md max-w-screen-sm"
                  onClick={() => deleteCartItem(item.id)}
                >
                  Remove item
                </button>
              </li>
            ))}
          </ul>
          <hr className="border-gray-200"></hr>
          <div className="flex flex-row flex-wrap justify-around items-center pt-4">
            <span>Total: </span>
            <span className="font-semibold text-red-900">
              {cart.reduce((totalPrice, currentItem) => {
                return (totalPrice +=
                  parseFloat(currentItem.price) * parseInt(currentItem.quantity));
              }, 0)} RM
            </span>
            <Link href="/checkout">
              <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Go to Checkout
              </a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
