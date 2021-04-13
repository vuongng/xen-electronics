import '../styles/globals.css'
import Link from 'next/link'
import { getProducts } from './api/productService'
import 'tailwindcss/tailwind.css'

function MyApp({ products }) {
  return (
    <div className="container">
      <div className="flex-row">
      {
        products.map((item) => (
          <Link className="flex" href=`/products/${item.id}`>
            <a>
              <div className="product-item">
                <img src={item.imageUrl} className="bg-contain"></img>
                  <h3 className="text-center">{item.name}</h3>
                  <p className="text-center">{item.description}</p>
                  <p className="text-red-800"><b>{item.price}</b></p>
                  <span className="">{item.brand}</span>
                  <span>{item.category}</span>
                </div>
            </a>
          </Link>
        ))
      }
      </div>  
    </div>
  )
}

export async function getServerSideProps() {
  const res = await getProducts()
  const products = await res.json()
  
  return { props: { products } }
}

export default MyApp
