import Navbar from "./Navbar"

const Layout = (props) => {
    return (
        <div className="container mx-auto px-4">
            <Navbar />
            {props.children}
        </div>
    )
}

export default Layout
