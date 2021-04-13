const PRODUCT_API_URL = `${process.env.PRODUCT_API}`

export async function getProducts() {
    const response = await fetch(PRODUCT_API_URL)
    return await response.json()
}

export async function getProductById(id: String) {
    const response = await fetch(`${PRODUCT_API_URL}/:id`)
    return await response.json()
}
