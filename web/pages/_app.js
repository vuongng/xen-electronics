import '../styles/tailwind.css'
import '../styles/globals.css'
import { CartProvider } from '../contexts/CartContext'
import { Provider } from 'next-auth/client'
import Layout from '../components/Layout'
import App from 'next/app'
import { getProducts } from './api/productService'
import ProductContext from '../contexts/ProductContext'

const MyApp = ({ Component, pageProps, products }) => {
  // Wrap login session outside the application
  // console.log(products)
  return (
    <ProductContext.Provider value={products}>
      <Provider session={pageProps.session}> {/* Global state for user login */}
        <CartProvider> {/* Global state for cart wrapper */}
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CartProvider>
      </Provider>
    </ProductContext.Provider>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const products = await getProducts()
  // console.log(products)
  const appProps = await App.getInitialProps(appContext)
  const props = { products: products, ...appProps }
  return { ...props }
}

export default MyApp
