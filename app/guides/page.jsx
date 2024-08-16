"use client";
import React, { useEffect, useContext } from "react";
import Header from "@/components/guide-page/Header";
import GuideCard from "@/components/guide-page/GuideCard";
import FilterRadio from "@/components/guide-page/FilterRadio";
import GuideFilterProvider from "@/contexts/guideFilter";

const GuidePage = () => {
  // const { filteredData, loading, error } = useContext(GuideFilterContext);
    return (
    <GuideFilterProvider>
      <div className="w-full flex flex-col">
        {/* header */}
        <Header />

        {/* body */}
        <div className="w-full max-w-[1000px] flex flex-col mx-auto gap-4 ">
          <main className="flex flex-col gap-4 px-4 md:flex-row relative">
            <FilterRadio />
            <div className="w-full">
              <section className="flex flex-col md:flex-row gap-4">
                <div className="w-full flex flex-col gap-4 items-center">
                  {/* <GuideCard guideData={guideData.rows} /> */}
                  <GuideCard />
                </div>

                {/* <aside className="border-2 border-purple-500 ">right</aside> */}
              </section>
            </div>
          </main>
        </div>
      </div>
    </GuideFilterProvider>
  );
};

export default GuidePage;
