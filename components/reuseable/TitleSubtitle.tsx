

export default function TitleSubtitle({title,subtitle}:{title:string,subtitle:string}) {
  return (
  
        <div className='flex flex-col py-1 items-center'>
            <h1 className='lg:text-4xl py-1 md:text-3xl text-center text-2xl font-medium'>{title}</h1>
            <p className='mt-0.5 py-1 text-sm font-light text-center'>{subtitle}</p>
        </div>
        
    
  )
}
