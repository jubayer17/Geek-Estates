import PropertyCard from "../reuseable/PropertyCard";


export default function AllPropertiesCard() {
  return (
    <div className="overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-center items-center">
        <PropertyCard
          image="/House1.jpg"
          title="Luxury Family Home"
          address="1800-1818 79th St, Dhaka"
          price="$395,000"
          beds={4}
          baths={1}
          area={400}
          status="For Sale"
          featured
        />
        <PropertyCard 
          image="/House1.jpg"
          title="Luxury Family Home"
          address="1800-1818 79th St, Dhaka"
          price="$395,000"
          beds={4}
          baths={1}
          area={400}
          status="For Sale"
          featured
        />
        <PropertyCard
          image="/House1.jpg"
          title="Luxury Family Home"
          address="1800-1818 79th St, Dhaka"
          price="$395,000"
          beds={4}
          baths={1}
          area={400}
          status="For Sale"
          featured
        />
    </div>
  )
}
