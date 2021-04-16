import server from '../src/server'
import t from 'tap'

describe('server', () => {
    test('should return product list response', async (t) => {
        const server = server

        const response = await server.inject({
            method: 'GET',
            url: '/v1/products'
        })
        
        t.strictEqual(response.statusCode, 200, '')
    })
    test('should return single product', async (t) => {

    })
    test('should create products table', async (t) => {

    })
})
