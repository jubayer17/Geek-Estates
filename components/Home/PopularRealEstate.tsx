import PopularRealEstateReuseable from '../reuseable/PopularRealEstateReuseable'
import TitleSubtitle from '../reuseable/TitleSubtitle'

const locations = [
  "The Villages, FL real estate",
  "New York, Real estate",
  "Madera, CA real estate",
  "Fontana, CA real estate",
  "Moreno Valley, CA real estate",
  "Aurora, IL real estate",
  "Perris, CA real estate",
  "Minnesota Lake, MN real estate",
  "Woodbridge, VA real estate",
];

function PopularRealEstateTag({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
      {text}
    </div>
  );
}

export default function PopularRealEstate() {
  return (
    <section className="lg:mt-20 md:mt-16 mt-10 px-4">
      <TitleSubtitle 
        title="Popular Real Estate Markets" 
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit." 
      />
      
      <div className="max-w-7xl mx-auto mt-8">
        <div className="flex flex-wrap gap-3 justify-center items-center">
          {locations.map((location, index) => (
            <PopularRealEstateTag 
              key={index} 
              text={location} 
            />
          ))}
        </div>
      </div>
    </section>
  );

}
