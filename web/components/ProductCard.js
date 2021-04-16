import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const ProductCard = (props) => {
  const { cart, addToCart } = useContext(CartContext);

  return (
    <div className="bg-white rounded-md shadow m-8 flex-1 flex-col relative">
      <Link href={`/products/${props.product.id}`}>
        <a className="flex-1">
          <img
            src={props.product.imageurl}
            className="text-center h-64 w-max"
          ></img>
          <div className="p-6">
            <h3>{props.product.name}</h3>
            <p>{props.product.description}</p>
            <p className="text-red-800">
              <b>{props.product.price}</b>
            </p>
            <span className="">{props.product.brand}</span>
            <span>{props.product.category}</span>
          </div>
        </a>
      </Link>
      <div className="p-6">
        <button
          onClick={() => addToCart(props.product)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Add to cart
        </button>
        <Link href="/checkout">
          <a className="bg-white hover:bg-gray-100 border-black border-solid font-bold py-2 px-4 rounded-full">
            Buy Now
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
