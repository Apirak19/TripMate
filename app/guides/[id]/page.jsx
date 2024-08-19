import React from "react";
import connectionPool from "@/utils/supabase/connectionPool";
import OverallReview from "@/components/Homepage/OverallReview";
import IndividualReview from "@/components/Homepage/IndividualReview";

const GuideProfile = async ({ params }) => {
  const { id } = params;

  const result = await connectionPool.query(
    `WITH avg_ratings AS (
        SELECT
          guide_id,
          AVG(rating) AS avg_rating
        FROM
          guide_rating
        GROUP BY
          guide_id
      ),
      followers AS (
        SELECT
          guide_id,
          COUNT(guide_id) AS followers,
          is_unfollowed
        FROM
          guide_follower
        WHERE
          is_unfollowed = false
        GROUP BY
          guide_id,
          is_unfollowed
      ),
      trip_counts AS (
        SELECT
          guide_id,
          COUNT(guide_id) AS trip_count
        FROM
          trips
        GROUP BY
          guide_id
      )
      SELECT
        g.*,
        ar.avg_rating,
        f.followers,
        f.is_unfollowed,
        tc.trip_count
      FROM
        guides g
        INNER JOIN avg_ratings ar ON g.guide_id = ar.guide_id
        INNER JOIN followers f ON g.guide_id = f.guide_id
        INNER JOIN trip_counts tc ON g.guide_id = tc.guide_id
      WHERE g.guide_id = $1`,
    [id]
  );
  const guide = result.rows[0]; // Get the first row from the result
  console.log("guide", guide);

  if (!guide) {
    return <h1>Guide not found</h1>;
  }

  return (
    <section className="w-full flex justify-center">
      <div className="w-full max-w-[1140px] relative">
        {/* wallpaper */}
        <article className="w-full h-[500px] flex items-end">
          <div className="w-full bg-gray-400 h-[500px] absolute -z-20 rounded-b-3xl"></div>

          {/* profile */}
          <div className="pb-4 px-4 w-full flex justify-between">
            {/* left */}
            <div className="flex gap-4">
              <div className="w-[168px] h-[168px] bg-slate-50 rounded-3xl z-10"></div>
              <div className="flex flex-col justify-end">
                <h1 className="text-4xl font-bold">
                  {guide.guide_firstname} {guide.guide_lastname}
                </h1>
                <p className="text-lg">{guide.followers} Follower</p>
              </div>
            </div>

            {/* right */}
            <div className="flex items-end gap-4">
              <button className="border-blue-400 border-2 text-blue-400 bg-white px-4 py-2 rounded-lg w-[100px]">
                Follow
              </button>
              <button className="bg-blue-400 text-white px-4 py-2 rounded-lg w-[100px]">
                Hire
              </button>
            </div>
          </div>
        </article>

        {/* bio */}
        <article className="w-full p-4 gap-4 flex">
          {/* left */}
          <div className="w-full max-w-[300px] flex flex-col gap-4">
            {/* short description */}
            <div className="w-full p-4 bg-slate-100 rounded-xl">
              <div>
                <h1 className="text-2xl font-semibold">Introduction</h1>
                <h1 className="text-lg">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Autem nostrum earum veniam ducimus hic beatae nisi fugiat.
                  Modi accusamus fuga aut veritatis, nihil iusto nam?
                </h1>
              </div>
            </div>

            {/* detail */}
            <div className="w-full p-4 bg-slate-100 rounded-xl">
              <div className="flex gap-1">
                <h1 className="text-lg font-semibold">Fluent in</h1>
                <div>
                  {guide.guide_language.map((item, index) => (
                    <>
                      <span
                        className="text-lg font-bold text-blue-400 cursor-pointer hover:underline"
                        key={index}
                      >
                        {item}
                      </span>
                      {index === guide.guide_language.length - 1 ? (
                        ""
                      ) : (
                        <span>, </span>
                      )}
                    </>
                  ))}
                </div>
              </div>
              <div className="">
                <span className="text-lg font-semibold pr-1">
                  Operating around
                </span>

                {guide.guide_preferred_region.map((item, index) => (
                  <>
                    <span className="font-bold text-blue-400 cursor-pointer hover:underline text-wrap">
                      {item}
                    </span>
                    {index === guide.guide_preferred_region.length - 1 ? (
                      ""
                    ) : (
                      <span>, </span>
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>

          {/* right */}
          <main className="w-full p-4 bg-slate-100 rounded-xl ">
            {/* review */}
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-semibold">Reviews</h1>
              <div className="flex">
                <OverallReview />
                <IndividualReview />
              </div>
            </div>
          </main>
        </article>
      </div>
    </section>
  );
};

export default GuideProfile;
