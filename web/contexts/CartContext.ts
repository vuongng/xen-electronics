import {createContext, useState} from 'react'

const CartContext = createContext()

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    
    const refreshCart = async () => {
        try {
            const res = await fetch('/api/getCart')
            const cart = await res.json()
            setCart(cart)
        } catch (err) {
            console.error(err)
        }
    }

    const addToCart = async (product: IProduct, userId: number) => {
        try {
            const res = await fetch({
                method: 'POST',
                url: '/api/addToCart',
                body: JSON.stringify({product, userId})
            })
        } catch (err) {
            console.error(err)
        }
    }

    const deleteCartItem = async (productId: number) => {
        try {
            const res = await fetch({
                method: 'POST',
                url: 'api/deleteCart/:id'
            })
            setCart((prevCart) => {
                return [newCart, ...prevCart]                
            })
        } catch (err) {
            console.log(err)
        }
    }

    const updateCart = async({ })
    return <CartContext.Provider value={{
        cart,
        refreshCart,
        addToCart,
        deleteCartItem,
        updateCart
    }}>{children}</CartContext.Provider>
}

interface IProduct {
    id: number
    name: string
    price: number
    quantity: 1
}

export { CartProvider, CartContext }
