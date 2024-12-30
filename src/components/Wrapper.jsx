function Wrapper({ children }) {

    return (
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 xl:px-16 2xl:px-32">
            <section className="flex flex-col my-10 lg:flex-row p-2 place-items-center justify-center content-center lg:min-w-[80vw]">
                {children}
            </section>
        </div>
    )
}

export default Wrapper
