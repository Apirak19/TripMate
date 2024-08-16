import React from "react";
import SortIcon from "@mui/icons-material/Sort";
import FilterHeader from "@/components/guide-page/FilterHeader";
import Sorting from "@/components/guide-page/Sorting";
import { Sort } from "@mui/icons-material";

const Header = ({ guideData }) => {
  const sortByAge = () => {
    return guideData.sort((a, b) => {
      return a.guide_age - b.guide_age;
    });
  };

  return (
    <div className="w-full flex flex-col gap-8 items-center bg-white py-4 pt-10 md:px-0 px-4">
      <div className="flex flex-col gap-8 items-center w-full">
        <h2 className="text-center text-2xl md:text-5xl font-semibold">
          Your Potential Trip Mates
        </h2>
        <FilterHeader />
        <Sorting guideData={guideData} />
        <div className="max-w-[600px]"></div>
      </div>
    </div>
  );
};

export default Header;
