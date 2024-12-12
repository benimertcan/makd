import { Ban } from "lucide-react"

function Warning({children}) {
   
    return (
        <>
        <Ban className='size-3 text-[#E0232E]'/>
           <span className='text-[#E0232E] border-red-500 border-[1px] rounded small  flex items-center p-1 ml-2 gap-1 bg-[#FFDEDE] w-60 md:w-[20rem]'>
            
            {children}
            </span>
        </>
    )
}

export default Warning
