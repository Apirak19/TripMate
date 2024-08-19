import React, { useContext, useEffect } from "react";
import GuideCard from "@/components/guide-page/GuideCard";
import { GuideFilterContext } from "@/contexts/guideFilter";

const GuideDisplay = () => {
  const { filteredData, loading, error } = useContext(GuideFilterContext);
  console.log("filteredData", filteredData);

  return (
    <div className="w-full flex justify-center">
      {loading ? (
        <section
          className="w-full h-full flex justify-center items-center"
          // style={{ height: "calc(100vh - 64px - 256px)" }}
        >
          <div
            className="inline-block h-[150px] w-[150px] animate-spin rounded-full border-[20px] border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-blue-400"
            role="status"
          ></div>
        </section>
      ) : filteredData.length !== 0 ? (
        <section className="flex flex-col md:flex-row gap-4">
          <div className="w-full flex flex-col gap-4 items-center">
            <section className="flex flex-wrap gap-5 justify-center py-5">
              {filteredData.map((guide) => (
                <GuideCard guide={guide} />
              ))}
            </section>
          </div>
        </section>
      ) : (
        <section>No Guide with filter condition</section>
      )}
      
      
    </div>
  );
};

export default GuideDisplay;
