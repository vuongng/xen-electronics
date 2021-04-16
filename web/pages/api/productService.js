// import { loadEnvConfig } from '@next/env' // for test purpose only

const PRODUCT_API_URL = `${process.env.PRODUCT_API}`

export async function getProducts() {
    return await fetch(PRODUCT_API_URL)
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            const products = result.rows.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category,
                brand: product.brand,
                description: product.description,
                imageurl: product.imageurl
            }))

            return products
        })
        .catch((error) => console.log(error))
}

export async function getProductById(id) {
    return await fetch(`${PRODUCT_API_URL}/${id}`)
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            const product = result.map((res) => ({
                id: res.id,
                name: res.name,
                price: res.price,
                category: res.category,
                brand: res.brand,
                description: res.description
            }))

            return product[0]
        })
        .catch((error) => console.log(error))
}
