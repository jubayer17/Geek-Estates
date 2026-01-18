"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AllPropertiesCard from "./AllPropertiesCard"

export default function FeaturedTabs() {
  return (
    <Tabs defaultValue="buy" className="w-full max-w-3xl mx-auto">
      
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
        
        <AllPropertiesCard/>
          
      </div>

      {/* View All Button */}
      <div className="mt-10 text-center">
        <button className="rounded-full bg-primary py-1 lg:px-8 lg:py-3 lg:my-4 text-white hover:opacity-90 transition">
          View All Properties
        </button>
      </div>
      </TabsContent>

      {/* Rent Tab */}
      <TabsContent value="rent" className="mt-6">
        <div className="rounded-lg border py-1 lg:p-6">
          <h3 className="text-lg font-semibold mb-2">Rent Property</h3>
          <p className="text-gray-600">
            Find rental homes that match your lifestyle and budget.
          </p>
        </div>
      </TabsContent>

      {/* Sell Tab */}
      <TabsContent value="sell" className="mt-6">
        <div className="rounded-lg border py-1 lg:p-6">
          <h3 className="text-lg font-semibold py-1 mb-2">Sell Property</h3>
          <p className="text-gray-600">
            List your property and connect with verified buyers.
          </p>
        </div>
      </TabsContent>

    </Tabs>
  )
}
