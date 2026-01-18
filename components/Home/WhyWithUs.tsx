import Image from 'next/image'
import HomeIcon from "../../public/HomeIcon.png"
import SecondHome from "../../public/secondHome.png"
import ThirdIcon from "../../public/thirdIcon.png"
import TitleSubtitle from '../reuseable/TitleSubtitle'


export default function WhyWithUs() {
  return (
    <section className='lg:mt-50 md:mt-30 mt-10'>
       
        <TitleSubtitle title='Why You Should Work With Us' subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'/>
        <div className="w-full bg-white py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          
          {/* Wide Range of Properties */}
          <div className="flex flex-col items-center px-4">
            <div className="w-14 h-14 mb-4 flex items-center justify-center bg-gray-100 rounded-full">
              <Image src={HomeIcon} alt="Properties Icon" width={26} height={26} />
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              Wide Range of Properties
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              We offer expert legal help for all related property items in Dubai.
            </p>
          </div>

          {/* Buy or Rent Homes */}
          <div className="flex flex-col items-center px-4">
            <div className="w-14 h-14 mb-4 flex items-center justify-center bg-gray-100 rounded-full">
              <Image src={SecondHome} alt="Buy/Rent Icon" width={26} height={26} />
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              Buy or Rent Homes
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              We sell your home at the best market price and very quickly as well.
            </p>
          </div>

          {/* Trusted by Thousands */}
          <div className="flex flex-col items-center px-4">
            <div className="w-14 h-14 mb-4 flex items-center justify-center bg-gray-100 rounded-full">
              <Image src={ThirdIcon} alt="Trusted Icon" width={26} height={26} />
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              Trusted by Thousands
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              We offer you free consultancy to get a loan for your new home.
            </p>
          </div>

        </div>
      </div>
    </div>
    </section>
  )
}
