import { useContext, useState } from 'react'
import { getProducts } from '../pages/api/productService'
import ProductContext from '../contexts/ProductContext'
import Link from 'next/link'

const SearchInput = () => {
    const [ searchResult, setSearchResult ] = useState([])

    const handleSearch = (products, term) => {
        const res = products.filter((product) => {
            return product.name.split('').some((substring) => term.includes(substring))
        })
        setSearchResult(res)
    }

    return (
        <ProductContext.Consumer>
            {
                value => (
                    <div className="flex flex-col w-full">
                        <div>
                            <input className="bg-white p-4 text-black w-full flex items-center"
                                type="text" id="searchTerm"
                                name="searchTerm"
                                autoComplete="off"
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
                        <ul className="absolute z-10 mt-12 bg-white left-10 right-10 top-14">
                            {searchResult.map((value, index) => (
                                <li key={index} className="bg-white text-black w-full flex justify-between items-center flex-row p4 absolute shadow-md">
                                    <Link href={`/products/${value.id}`}>
                                        <a className="flex flex-row justify-between p-4">
                                            <img src={value.imageurl} className="object-cover h-16 w-16 self-center" />
                                            <p className="font-bold text-lg self-center ml-4">{value.name}</p>
                                            <p className="font-semibold text-lg text-red-900 self-center ml-4">{value.price}</p>
                                        </a>
                                        {/* <hr className="border-gray-400" /> */}
                                    </Link>
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
