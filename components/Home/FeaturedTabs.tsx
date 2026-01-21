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
      <TabsList className="flex w-fit mx-auto rounded-full bg-muted p-1">
        <TabsTrigger
          value="buy"
          className="rounded-full lg:px-6 py-1 lg:py-2 data-[state=active]:bg-[#FFF8F6]"
        >
          All Properties
        </TabsTrigger>

        <TabsTrigger
          value="rent"
          className="rounded-full lg:px-6 py-1 lg:py-2 data-[state=active]:bg-[#FFF8F6]"
        >
          For Rent
        </TabsTrigger>

        <TabsTrigger
          value="sell"
          className="rounded-full lg:px-6 py-1 lg:py-2 data-[state=active]:bg-[#FFF8F6]"
        >
          For Sell
        </TabsTrigger>
      </TabsList>

      {/* Buy Tab */}
      <TabsContent value="buy" className="mt-6 w-full">
        <div>

          <FeaturedSectionCard limit={6} properties={allProperties} />

        </div>

        {/* View All Button */}
        <div className="mt-10 flex justify-center items-center text-center">
          <CommonButton buttonText="View All Properties" />
        </div>
      </TabsContent>

      {/* Rent Tab */}
      <TabsContent value="rent" className="mt-6 w-full">
        <div>

          <FeaturedSectionCard limit={6} properties={forSellProperties} />

        </div>

        {/* View All Button */}
        <div className="mt-10 flex justify-center items-center text-center">
          <CommonButton buttonText="View Rentable Properties" />
        </div>
      </TabsContent>

      {/* Sell Tab */}
      <TabsContent value="sell" className="mt-6 w-full">
        <div>

          <FeaturedSectionCard limit={9} properties={forRentProperties} />

        </div>

        {/* View All Button */}
        <div className="mt-10 flex justify-center items-center text-center">
          <CommonButton buttonText="View On sell Properties" />
        </div>
      </TabsContent>

    </Tabs>
  )
}
