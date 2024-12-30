import Footer from "./Footer"
import Header from "./Header"


function Layout({children}) {

    return (
        <div className="min-h-screen flex flex-col w-full">
            <Header/>
            <main className="bg-background-light flex-grow w-full max-w-[1920px]  ">
                {children}
            </main>
            <Footer/>
        </div>
    )
}

export default Layout
