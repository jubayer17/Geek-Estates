"use client"

import { LazyMotion, domAnimation, m } from "framer-motion"
import properties from "../../public/data/properties.json"
import AllPropertyCard from "../reuseable/AllPropertyCard"

export default function PropertyList() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-28">
          {properties.map((property, index) => {
            const isLeft = index % 2 === 0

            return (
              <m.div
                key={property.id}
                initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{
                  once: false, // animate every time
                  amount: 0.3,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
                className={`
                  ${index % 4 === 1 ? "mt-32" : ""}
                  ${index % 4 === 3 ? "mt-40" : ""}
                `}
              >
                <AllPropertyCard
                  image={property.image}
                  title={property.title}
                  address={property.address}
                  date="21 Apr"
                />
              </m.div>
            )
          })}
        </div>
      </div>
    </LazyMotion>
  )
}
