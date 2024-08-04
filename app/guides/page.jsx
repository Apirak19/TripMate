import React from "react";
// import { createClient } from "@/utils/supabase/server";
// import { cookies } from "next/headers";
import supabase from "@/utils/supabase/supabaseClient";
import GuideCard from "@/components/guide-page/GuideCard";
import FilterRadio from "@/components/guide-page/FilterRadio";
import SortIcon from "@mui/icons-material/Sort";

const GuidePage = async () => {
  const { data: guideData } = await supabase.from("guides").select("*");
  console.log("guideData", guideData);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col gap-8 items-center bg-white py-4 ">
        <div className="flex flex-col gap-4 items-center">
          <h2 className="text-center text-5xl font-semibold">
            Your Potential Trip Mates
          </h2>
          <div className="flex justify-center w-full max-w-[400px] ">
            <label
              htmlFor="sortby"
              className="font-semibold rounded-l-lg border-2 text-center w-1/3 bg-blue-100"
            >
              Sort by
            </label>
            <div className="flex w-full">
              <button className="border-y-2 border-r-2 w-1/2">Rating</button>
              <button className="border-y-2 border-r-2 w-1/2">Trips</button>
              <button className="border-y-2 border-r-2 w-1/2">Followers</button>
              <button className="border-y-2 border-r-2 rounded-r-lg px-2">
                <SortIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-[1000px] flex flex-col mx-auto gap-4 ">
        <main className="flex flex-col gap-4 px-4 md:flex-row relative">
          <FilterRadio />
          <div className="w-full">
            <section className="flex flex-col md:flex-row gap-4">
              <div className="w-full flex flex-col gap-4 items-center">
                <GuideCard guideData={guideData} />
              </div>

              {/* <aside className="border-2 border-purple-500 ">right</aside> */}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GuidePage;
