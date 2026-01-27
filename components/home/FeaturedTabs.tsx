"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import allProperties from "../../public/data/properties.json"
import forRentProperties from "../../public/data/forRent.json"
import forSellProperties from "../../public/data/forSell.json"
import CommonButton from "../reuseable/CommonButton"
import { FeaturedSectionCard } from "../reuseable/FeaturedSectionCard"


export default function FeaturedTabs() {
  return (
    <Tabs defaultValue="buy" className="w-full max-w-5xl mx-auto">

      {/* Tab Buttons */}
      <TabsList className="flex w-fit mx-auto rounded-full bg-white border border-slate-100 p-1.5 shadow-lg shadow-slate-100/50 mb-12">
        <TabsTrigger
          value="buy"
          className="rounded-full lg:px-8 py-2 lg:py-3 text-base font-medium tracking-wide text-slate-500 data-[state=active]:bg-[#E7C873] data-[state=active]:text-slate-900 transition-all duration-300"
        >
          All Properties
        </TabsTrigger>

        <TabsTrigger
          value="rent"
          className="rounded-full lg:px-8 py-2 lg:py-3 text-base font-medium tracking-wide text-slate-500 data-[state=active]:bg-[#E7C873] data-[state=active]:text-slate-900 transition-all duration-300"
        >
          For Rent
        </TabsTrigger>

        <TabsTrigger
          value="sell"
          className="rounded-full lg:px-8 py-2 lg:py-3 text-base font-medium tracking-wide text-slate-500 data-[state=active]:bg-[#E7C873] data-[state=active]:text-slate-900 transition-all duration-300"
        >
          For Sell
        </TabsTrigger>
      </TabsList>

      {/* Buy Tab */}
      <TabsContent value="buy" className="w-full focus-visible:outline-none animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        <div>

          <FeaturedSectionCard limit={6} properties={allProperties} />

        </div>

        {/* View All Button */}
        <div className="mt-16 flex justify-center items-center text-center">
          <CommonButton buttonText="View All Properties" />
        </div>
      </TabsContent>

      {/* Rent Tab */}
      <TabsContent value="rent" className="w-full focus-visible:outline-none animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        <div>

          <FeaturedSectionCard limit={6} properties={forRentProperties} />

        </div>

        {/* View All Button */}
        <div className="mt-16 flex justify-center items-center text-center">
          <CommonButton buttonText="View Rentable Properties" />
        </div>
      </TabsContent>

      {/* Sell Tab */}
      <TabsContent value="sell" className="w-full focus-visible:outline-none animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        <div>

          <FeaturedSectionCard limit={9} properties={forSellProperties} />

        </div>

        {/* View All Button */}
        <div className="mt-16 flex justify-center items-center text-center">
          <CommonButton buttonText="View On sell Properties" />
        </div>
      </TabsContent>

    </Tabs>
  )
}
