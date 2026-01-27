import OurStoryTextAnimation from '../reuseable/TextAnimation'

export default function OurStory() {
  const ourStoryProps = {
    title: "Our Story",
    paragraphs: [
      "With a vision to cater to the residential and commercial housing needs of the country, ASSURANCE Developments Ltd. was established in 2003.",
      "The company successfully completed exclusive residential projects in prime locations and quickly became one of the leading real estate companies in Bangladesh.",
      "Through quality, commitment, and ethical business practices, ASSURANCE earned ISO certification and REHAB membership."
    ],
    image: "/BannerImage.webp",
    stats: [
      { value: 20, label: "Residential Projects", suffix: "+" },
      { value: 10, label: "Commercial Projects", suffix: "+" },
      { value: 5, label: "Awards Won", suffix: "" },
      { value: 21, label: "Years of Excellence", suffix: "" }
    ],
    bgColor: "#0F172A"
  };

  return (
    <div>
      <OurStoryTextAnimation {...ourStoryProps} />
    </div>
  )
}
