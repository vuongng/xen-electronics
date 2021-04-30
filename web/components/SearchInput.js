import { useContext, useState } from 'react'
import { getProducts } from '../pages/api/productService'
import ProductContext from '../contexts/ProductContext'

const SearchInput = () => {
    const [ searchResult, setSearchResult ] = useState([])

    const handleSearch = (products, term) => {
        // console.log(products)
        const res = products.filter((product) => {
            return product.name.split('').some((substring) => term.includes(substring))
        })
        setSearchResult(res)
    }

    return (
        <ProductContext.Consumer>
            {
                value => (
                    <div className="flex flex-col">
                        <div>
                            <input className="bg-white p-4 text-black w-full flex items-center"
                                type="text" id="searchTerm"
                                name="searchTerm"
                                onChange={(e) => handleSearch(value, e.target.value)} />
                            <button type="submit"
                                className="absolute right-0 top-0 mt-5 mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                className="text-gray-600 h-4 w-4 fill-current"
                                fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                    <path strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                        <ul className="z-10">
                            {searchResult.map((value, index) => (
                                <li key={index} className="bg-white text-black w-full flex items-center flex-row p4">
                                    {/* <img src={value.imageurl} className="object-contain" /> */}
                                    <p className="font-bold p-4">{value.name}</p>
                                    <p className="font-semibold text-red-900 p-4">{value.price}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            }
        </ProductContext.Consumer>
    )
}

export default SearchInput
