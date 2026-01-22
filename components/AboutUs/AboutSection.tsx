import InteractiveContentGrid from "./ContainGrid";
import SectionHeading from "./SectionHeading";
import data from "../../public/data/aboutUs.json";


export default function AboutSection() {
  return (
    <section className="bg-black px-6 md:px-20 lg:py-50 py-24">
      <SectionHeading title="About Us" />
      <InteractiveContentGrid items={data.items} />
    </section>
  );
}
