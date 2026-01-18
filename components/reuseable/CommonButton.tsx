import { MoveRightIcon } from 'lucide-react'
import { Button } from '../ui/button'

export default function CommonButton({buttonText}:{buttonText:string}) {
  return (
 
         <Button className="rounded-full flex justify-center items-center text-center bg-[#E7C873] text-gray-900 py-1 lg:px-8 lg:py-3 lg:my-4 gap-1 hover:opacity-90 hover:bg-amber-300 transition">
          {buttonText} <MoveRightIcon className="text-center"/>
        </Button>
   
  )
}
