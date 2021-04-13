import '../styles/globals.css'
import Link from 'next/link'
import { getProducts } from './api/productService'

function MyApp({ Component, pageProps, products }) {
  // return <Component {...pageProps} />
  return (
    <div className="container">
      {
        products.map((item) => {
          <Link href=`/products/${item.id}`>
            <a>
              <div className="product-item">
                <img src={item.imageUrl} className="cover"></img>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p><b>{item.price}</b></p>
                  <span>{item.brand}</span>
                  <span>{item.category}</span>
                </div>
            </a>
          </Link>
        })
      }  
    </div>
  )
}

export async function getServerSideProps() {
  const res = await getProducts()
  const data = await res.json()
  
  return { products: { data } }
}

export default MyApp
