import '../styles/tailwind.css'
import '../styles/globals.css'
import { CartProvider } from '../contexts/CartContext'
import { Provider } from 'next-auth/client'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  // Wrap login session outside the application
  return (
    <Provider session={pageProps.session}> {/* Global state for user login */}
        <CartProvider> {/* Global state for cart wrapper */}
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
    </Provider>
  )
}

export default MyApp
