import '../styles/tailwind.css'
import '../styles/globals.css'
import { CartProvider } from '../contexts/CartContext'
import { Provider } from 'next-auth/client'
import Layout from '../components/Layout'
import App from 'next/app'
import { getProducts } from './api/productService'
import ProductContext from '../contexts/ProductContext'
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'

const MyApp = ({ Component, pageProps, products }) => {
  // Wrap login session outside the application
  // console.log(products)
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout} = useAuth0()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }

  if (isAuthenticated) {
    return (
      <div>
        Hello {user.name}{' '}
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log out
        </button>
      </div>
    )
  } else {
    return <button onClick={loginWithRedirect}>Log in</button>
  }

  return (
    <Auth0Provider domain={'dev-zc92re6t.us.auth0.com'} clientId={} redirectUri={window.location.origin} >

    </Auth0Provider>
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
