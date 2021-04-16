import { getProducts, getProductById } from "../api/productService";
import { useRouter } from "next/router";
import { useContext } from "react";

const ProductDetailPage = (props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <span>Loading...</span>;
  }

  if (props.error) {
    return <div>There is something wrong</div>;
  }

  return (
    <div className="container">
      <div className="grid-flow-row">
        <img src={props.product.imageUrl} className="bg-cover" />
        <h2>{props.product.name}</h2>
        <p className="text-xl">{props.product.description}</p>
        <p className="text-lg bold">{props.product.price}</p>
      </div>
      <button className="btn btn-primary">Add to cart</button>
      <button className="btn">Buy now</button>
    </div>
  );
};

// export const getStaticPaths = async () => {
//   let products = await getProducts();

//   const paths = products.map((product, index) => ({
//     params: {
//       id: index.toString(),
//     },
//   }));

//   return { paths, fallback: true };
// };

export const getServerSideProps = async ({ query }) => {
  const product = await getProductById(parseInt(query.id));

  if (!product) {
    return {
      props: { error: true },
    };
  }

  return {
    props: { product },
  };
};

export default ProductDetailPage;
