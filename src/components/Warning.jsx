import { Ban } from "lucide-react"

function Warning({children}) {
   
    return (
        <><div className="flex flex-row  place-items-center ml-2 w-60 md:w-[20rem]">
        <Ban className='size-3 absolute text-[#E0232E]'/>
           <span className='text-[#E0232E] border-red-500 border-[1px] rounded small  flex items-center p-1 ml-4 gap-1 bg-[#FFDEDE] '>
            
            {children}
            </span>
            </div>
        </>
    )
}

export default Warning
