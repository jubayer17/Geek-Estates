import Image from "next/image";

interface AllPropertyCardProps {
  image: string;
  title: string;
  address: string;
  date: string;
  area: number;
  price: string;
}

export default function AllPropertyCard({
  image,
  title,
  address,
  date,
  area,
  price,
}: AllPropertyCardProps) {
  return (
    <div className="group relative w-full overflow-hidden bg-white shadow-lg transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl">
      {/* Portrait Aspect Ratio Container (3:4 = 0.75, or taller like 2:3) 
          Let's go with Aspect Ratio 3:4 which is very standard for portrait photography
      */}
      <div className="relative aspect-3/4 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-tr from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />

        {/* Floating Content over Image */}
        <div className="absolute bottom-0 left-0 w-full p-6 text-white transform transition-transform duration-500 group-hover:-translate-y-2">
          <div className="mb-3 flex items-center gap-3 text-sm font-medium uppercase tracking-widest opacity-90">
            <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">{date}</span>
            <span>{area} sq ft</span>
          </div>

          <h3 className="mb-2 font-serif text-3xl font-light leading-tight text-white group-hover:text-[#C5A059] transition-colors">
            {title}
          </h3>

          <p className="mb-5 text-base font-light text-gray-300 line-clamp-1">
            {address}
          </p>

          <div className="flex items-center justify-between border-t border-white/20 pt-5 opacity-0 transition-all duration-500 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
            <span className="text-2xl font-semibold tracking-wide">{price}</span>
            <button className="rounded-full bg-white p-3 text-black transition-colors hover:bg-[#C5A059] hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
