

export default function TitleSubtitle({title,subtitle}:{title:string,subtitle:string}) {
  return (
    <div className='flex flex-col py-6 items-center max-w-2xl mx-auto'>
        <div className="w-16 h-[1px] bg-[#E7C873] mb-4"></div>
        <h1 className='lg:text-5xl md:text-4xl text-3xl font-serif italic text-slate-900 text-center leading-tight mb-4'>
            {title}
        </h1>
        <p className='text-base md:text-lg font-light text-slate-600 text-center leading-relaxed'>
            {subtitle}
        </p>
    </div>
  )
}
