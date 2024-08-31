import React, { useState, useContext } from "react";
import { GuideFilterContext } from "@/contexts/guideFilter";
import Link from "next/link";

const GuideCard = ({ guide }) => {
  const { filteredData, setFilteredData } = useContext(GuideFilterContext);
  // const [filteredData, setFilteredData] = useState(guideData);

  // console.log("filteredData", filteredData);

  return (
    <article
      className="w-full max-w-[850px] p-4 bg-white rounded-xl shadow-card-shadow flex gap-4 relative"
      key={guide.guide_id}
    >
      {/* bg */}
      <div
        className="h-[62px] w-full absolute top-0 left-0"
        style={{
          backgroundImage: `url("https://placehold.co/600x400?text=Hello+World")`,
        }}
      ></div>

      {/* avatar */}
      <div
        className="leading-4 flex flex-col gap-2 z-10 w-full max-w-[200px] h-[200px] bg-cover bg-center rounded"
        style={{
          backgroundImage: `url("https://placehold.co/600x400?text=Hello+World")`,
        }}
      ></div>

      {/* detail */}
      <div className="leading-4 flex flex-col gap-2 z-10 justify-end w-full font-medium">
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            <h4 className="text-xl font-semibold leading-4">
              {guide.guide_firstname} {guide.guide_lastname}{" "}
              <span className="font-normal">({guide.guide_age})</span>
            </h4>
            <p className="text-sm leading-4">
              Rating: {Number(guide.avg_rating.toFixed(2))}
            </p>
          </div>
        </div>
        <p>
          <span>Fluent in </span>
          {guide.guide_language.map((item, index) => (
            <>
              <span
                className="font-bold text-blue-400 cursor-pointer hover:underline"
                key={index}
              >
                {item}
              </span>
              {index === guide.guide_language.length - 1 ? "" : <span>, </span>}
            </>
          ))}
        </p>
        <p>
          <span>Operating around </span>
          {guide.guide_preferred_region.map((item, index) => (
            <>
              <span className="font-bold text-blue-400 cursor-pointer hover:underline">
                {item}
              </span>
              {index === guide.guide_preferred_region.length - 1 ? (
                ""
              ) : (
                <span>, </span>
              )}
            </>
          ))}
        </p>
        <p>
          <span className="">Guided through </span>
          <span className="font-bold text-blue-400">{guide.trip_count}</span>
          <span>{guide.trip_count === "1" ? " trip" : " trips"}</span>
        </p>

        <div className="flex gap-4">
          <Link href={`/guides/${guide.guide_id}`} className="w-full">
            <button className="w-full p-2 border-2 border-blue-400 rounded-lg transform hover:scale-105">
              View Profile
            </button>
          </Link>
          <Link href={`/booking?guide_id=${guide.guide_id}`} className="w-full">
            <button className="w-full p-2 bg-blue-400 text-white rounded-lg transform hover:scale-105">
              Hire
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default GuideCard;

{
  /* <article
      className="w-full max-w-[850px] p-4 bg-white rounded-xl shadow-card-shadow flex flex-col gap-4 relative"
      key={guide.guide_id}
    >
      <div
        className="h-[62px] w-full absolute top-0 left-0"
        style={{
          backgroundImage: `url("https://placehold.co/600x400?text=Hello+World")`,
        }}
      ></div>
      <div className="leading-4 flex flex-col gap-2 z-10">
        <div className="flex flex-col gap-1">
          <div
            className="w-[72px] h-[72px] rounded-full bg-cover bg-center bg-no-repeat border-2 border-white mb-2"
            style={{
              backgroundImage: `url("https://placehold.co/600x400?text=Hello+World")`,
            }}
          ></div>
          <div className="flex gap-1">
            <h4 className="text-xl font-semibold leading-4">
              {guide.guide_firstname} {guide.guide_lastname}{" "}
              <span className="font-normal">({guide.guide_age})</span>
            </h4>
            <p className="text-sm leading-4">
              rating: {Number(guide.avg_rating.toFixed(2))}
            </p>
          </div>
        </div>
        <p>
          <span >Language: </span>
          {guide.guide_language.map((item, index) => (
            <span className="pr-2" key={index}>
              {item}
            </span>
          ))}
        </p>
        <p>
          <span >Working Area: </span>
          {guide.guide_preferred_region.map((item, index) => (
            <span className="pr-2" key={index}>
              {item}
            </span>
          ))}
        </p>
      </div>
      <button className="w-full p-2 border-2 border-blue-400 rounded-lg">
        Hire
      </button>
    </article> */
}
