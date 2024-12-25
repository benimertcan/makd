import ShopHeader from "./ShopHeader"
import Footer from "../Footer"
import Header from "../Header"

function ShopLayout({children}) {
    return (
        <>
        <ShopHeader/>
           <Header />
           
           <main className="bg-background-light">{children}</main>
           <Footer/>
        </>
    )
}

export default ShopLayout
