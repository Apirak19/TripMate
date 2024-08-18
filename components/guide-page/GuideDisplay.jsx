import React, { useContext } from "react";
import GuideCard from "@/components/guide-page/GuideCard";
import { GuideFilterContext } from "@/contexts/guideFilter";

const GuideDisplay = () => {
  const { filteredData } = useContext(GuideFilterContext);
  console.log("filteredData", filteredData);

  return (
    <div className="w-full flex items-center justify-center">
      {filteredData.length === 0 ? (
        <div
          className="inline-block h-[150px] w-[150px] animate-spin rounded-full border-[20px] border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-blue-400"
          role="status"
        ></div>
      ) : (
        <section className="flex flex-col md:flex-row gap-4">
          <div className="w-full flex flex-col gap-4 items-center">
            <section className="flex flex-wrap gap-5 justify-center py-5">
              {filteredData.map((guide) => (
                <GuideCard guide={guide} />
              ))}
            </section>
          </div>
        </section>
      )}
    </div>
  );
};

export default GuideDisplay;
