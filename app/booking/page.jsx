import React from "react";
import connectionPool from "@/utils/supabase/connectionPool";
import TripOption from "@/components/booking/TripOption";

const Booking = async ({ searchParams }) => {
  const guideId = searchParams.guide_id;
  console.log(guideId);
  const resGuide = await connectionPool.query(
    `SELECT * FROM guides WHERE guide_id = $1`,
    [guideId]
  );
  const regionMap = {
    Northern: "Northern Thailand",
    Central: "Central Thailand",
    Southern: "Southern Thailand",
    Eastern: "Eastern Thailand",
    Western: "Western Thailand",
    NorthEastern: "NorthEastern Thailand",
  };
  let whereCondition = "WHERE ";
  let availableDesdination = [];
  console.log("guideData", resGuide.rows[0]);
  const guideData = await resGuide.rows[0];
  guideData.guide_preferred_region.map((item, index) => {
    availableDesdination.push(item);
    if (index !== guideData.guide_preferred_region.length - 1) {
      whereCondition += `attraction_region = '${regionMap[item]}' OR `;
    } else {
      whereCondition += `attraction_region = '${regionMap[item]}' `;
    }
  });
  console.log("whereCondition", whereCondition);

  availableDesdination.map((item, index) => {
    if (availableDesdination.length > 0) {
    }
    return `attraction_region = '${regionMap[item]}'`;
  });

  const resAttraction = await connectionPool.query(
    `SELECT * FROM attractions ${whereCondition}`
  );

  const attractionData = resAttraction.rows;

  return (
    <section className="w-full flex justify-center">
      <div className="w-full max-w-[1140px] bg-blue-200 p-4 flex flex-col gap-4">
        <article className="w-full p-4 bg-white rounded-lg flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Booking Process</h1>
        </article>

        {/* guide info */}
        <article className="w-full p-4 bg-white rounded-lg flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Guide Information</h1>
          <div className="w-full flex gap-4">
            <div className="w-[200px] h-[200px] shrink-0 bg-slate-200 rounded-lg"></div>
            {/* detail */}
            <div
              className="bg-blue-100 w-full flex flex-col gap-4 p-4 text-nowrap"
              style={{
                maxWidth: "calc(100% - 200px)",
              }}
            >
              <div className="flex gap-2">
                <p className="text-xl font-semibold">Fullname:</p>
                <p className="text-xl">
                  {guideData.guide_firstname} {guideData.guide_lastname}
                </p>
              </div>

              <div className="flex gap-2">
                <p className="text-xl font-semibold">Age:</p>
                <p className="text-xl">{guideData.guide_age}</p>
              </div>

              <div className="flex gap-2">
                <p className="text-xl font-semibold">Active area:</p>
                <p className="text-xl">
                  {guideData.guide_preferred_region.map((item, index) => (
                    <>
                      <span>{item}</span>
                      {index === guideData.guide_preferred_region.length - 1 ? (
                        ""
                      ) : (
                        <span>, </span>
                      )}
                    </>
                  ))}
                </p>
              </div>

              <div className="flex gap-2">
                <p className="text-xl font-semibold">Fluent language:</p>
                <p className="text-xl">
                  {guideData.guide_language.map((item, index) => (
                    <>
                      <span>{item}</span>
                      {index === guideData.guide_language.length - 1 ? (
                        ""
                      ) : (
                        <span>, </span>
                      )}
                    </>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </article>

        <TripOption attractionData={attractionData} guideData={guideData} />
      </div>
    </section>
  );
};

export default Booking;
