interface IQueryString {
    brand?: string
    category?: string
}

interface IRequestParams {
    id?: number
}

interface IRequestBody {
    products: string
    totalPrice: number
    deliveryAddress: string
    userId: number
}

export { IQueryString, IRequestParams, IRequestBody }
