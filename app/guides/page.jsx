"use client";
import React, { useEffect, useContext } from "react";
import Header from "@/components/guide-page/Header";
import GuideCard from "@/components/guide-page/GuideCard";
import FilterRadio from "@/components/guide-page/FilterRadio";
import GuideDisplay from "@/components/guide-page/GuideDisplay";
import GuideFilterProvider from "@/contexts/guideFilter";

const GuidePage = () => {
  // const { filteredData, loading, error } = useContext(GuideFilterContext);
  return (
    <GuideFilterProvider>
      <div className="w-full flex flex-col">
        {/* header */}
        <Header />

        {/* body */}
        <div className="w-full max-w-[1140px] flex flex-col mx-auto gap-4 ">
          <main className="w-full flex flex-col gap-4 px-4 md:flex-row relative">
            <FilterRadio />
            <GuideDisplay />
          </main>
        </div>
      </div>
    </GuideFilterProvider>
  );
};

export default GuidePage;
