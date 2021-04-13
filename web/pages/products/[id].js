import { getProductById } from '../api/productService'

function ProductDetailPage({ product }) {
    return (
        <div className="container">
           <div className="grid-flow-row">
                <img src={product.imageUrl} className="bg-cover" />
                <h2>{product.name}</h2>
                <p className="text-xl">{product.description}</p>
                <p className="text-lg bold">{product.price}</p>
           </div>
        </div>
    )
}

export async function getStaticProps(context) {
    const { id } = context.params
    const res = await getProductById(id)
    const data = await res.json()

    if (!data) {
        return {
            notFound: true
        }
    }

    return {
        props: { product }
    }
}
