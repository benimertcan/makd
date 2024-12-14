import Footer from "./Footer"
import Header from "./Header"


function Layout({children}) {


    return (
        <>
           <Header/>
           <main className="bg-background-light">{children}</main>
           <Footer/>
        </>
    )
}

export default Layout
