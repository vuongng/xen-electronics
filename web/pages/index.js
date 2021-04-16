import Head from "next/head";
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import { getProducts } from "./api/productService";
import { signIn, signOut, useSession } from "next-auth/client";

const Home = ({ products }) => {
  const { session, loading } = useSession();

  return (
    <div className="flex flex-wrap flex-row">
        {products.map((item, index) => (
          <ProductCard product={item} key={index} />
        ))}
      </div>
  );
}

export async function getServerSideProps() {
  const products = await getProducts();

  return { props: { products } };
}

export default Home
