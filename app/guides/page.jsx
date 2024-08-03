import React from "react";
// import { createClient } from "@/utils/supabase/server";
// import { cookies } from "next/headers";
import supabase from "@/utils/supabase/supabaseClient";
import GuideCard from "@/components/guide-page/GuideCard";
import FilterRadio from "@/components/guide-page/FilterRadio";

const GuidePage = async () => {
  const { data: guideData } = await supabase.from("guides").select("*");
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col gap-8 items-center bg-white py-4 mb-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-center text-5xl font-semibold">
            Your Potential Trip Mates
          </h2>
          <div className="flex justify-center gap-2">
            <label htmlFor="sortby">Sort by</label>
            <div className="flex gap-1">
              <p>Price</p>
              <p>Most trips</p>
            </div>
            <select name="" id="">
              <option value="price">Less to more</option>
            </select>
          </div>
        </div>
      </div>
      <div className="w-full max-w-[1000px] flex flex-col mx-auto gap-4 ">
        <main className="flex flex-col gap-4 px-4 md:flex-row">
          <FilterRadio />
          <div className="w-full">
            <section className="flex flex-col md:flex-row gap-4">
              <div className="w-full flex flex-col gap-4 items-center">
                <GuideCard guideData={guideData} />
              </div>

              <aside className="border-2 border-purple-500 ">right</aside>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GuidePage;
