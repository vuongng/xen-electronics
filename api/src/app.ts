import server from './server'

// Start server
const start = async () => {
    try {
        await server.listen(3000)
        const address = server.server.address();
        const port = typeof address === "string" ? address : address?.port
        console.log(`Server is listening on port: ${port}`)
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

start()
