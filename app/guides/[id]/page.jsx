import React from "react";
import connectionPool from "@/utils/supabase/connectionPool";
import OverallReview from "@/components/Homepage/OverallReview";
import IndividualReview from "@/components/Homepage/IndividualReview";
import TripReview from "@/components/guide-profile/TripReview";
import PostCard from "@/components/guide-profile/PostCard";
import Link from "next/link";
import Header from "@/components/guide-profile/Header";

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

  const trips = [
    {
      author: "Jane Doe",
      avatar:
        "https://images.unsplash.com/photo-1556912179-5d7f3c0e6b8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      creatAt: "September 14, 2016",
      title: "Thai Street Food Tour",
      content:
        "Experience the best of Thai street food with our local guides. From Pad Thai to Mango Sticky Rice, you'll get to taste a variety of dishes and learn about their history and cultural significance.",
      image: "https://placehold.co/600x400",
      likes: [
        {
          user: "John Smith",
          likedAt: "September 14, 2016",
        },
        {
          user: "Bob Johnson",
          likedAt: "September 14, 2016",
        },
        {
          user: "Jane Doe",
          likedAt: "September 14, 2016",
        },
        {
          user: "John Smiths",
          likedAt: "September 14, 2016",
        },
      ],
      comments: [
        { author: "John Smith", content: "This tour was amazing!" },
        { author: "Bob Johnson", content: "I highly recommend this tour!" },
      ],
    },
    {
      author: "Morgan Mo",
      avatar:
        "https://images.unsplash.com/photo-1556912179-5d7f3c0e6b8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      creatAt: "September 14, 2016",
      title: "Thai Cooking Class",
      content:
        "Learn how to cook authentic Thai dishes with our local chefs. From shopping for ingredients at a local market to preparing and cooking the dishes, you'll get an immersive experience in Thai cuisine.",
      image: "https://placehold.co/600x400",
      likes: [
        {
          user: "John Smiths",
          likedAt: "September 14, 2016",
        },
        {
          user: "Bob Johnson",
          likedAt: "September 14,2016",
        },
        { user: "Jane Doe", likedAt: " September ,2021" },
      ],
      comments: [
        { author: "John Smith", content: "This class was so much fun!" },
        { author: "Bob Johnson", content: "I learned so many new recipes!" },
      ],
    },
    {
      author: "Morgana Mee",
      avatar:
        "https://images.unsplash.com/photo-1556912179-5d7f3c0e6b8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      creatAt: "September 14, 2016",
      title: "Thai Fighting Class",
      content:
        "Learn the ancient art of Muay Thai with our experienced instructors. From basic techniques to advanced moves, you'll get a full workout and learn self-defense skills.",
      image: "https://placehold.co/600x400",
      likes: [
        {
          user: "John Smiths",
          likedAt: "September 14, 2016",
        },
        {
          user: "Bob Johnson",
          likedAt: "September 14,2016",
        },
      ],
      comments: [
        { author: "John Smith", content: "This class was so much fun!" },
        { author: "Bob Johnson", content: "I learned so many techniques!" },
      ],
    },
  ];

  return (
    <section className="w-full flex justify-center">
      <div className="w-full max-w-[1140px] relative">
        {/* header */}
        <Header guide={guide} />

        {/* bio */}
        <article className="w-full p-4 gap-4 flex">
          {/* left */}
          <div className="w-full max-w-[300px] flex flex-col gap-4">
            {/* short description */}
            <div className="w-full p-4 bg-slate-300 rounded-xl">
              <div>
                <h1 className="text-2xl font-semibold">Introduction</h1>
                <h1 className="text-lg">{guide.guide_intro}</h1>
              </div>
            </div>

            {/* detail */}
            <div className="w-full p-4 bg-slate-300 rounded-xl">
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
          <main className="w-full max-w-[840px] flex flex-col gap-4">
            {/* review */}
            <div className="w-full max-w-full flex flex-col gap-4 p-4 bg-slate-300 rounded-xl">
              <h1 className="text-2xl font-semibold">Reviews</h1>
              <div className="flex">
                <OverallReview />
                <TripReview />
              </div>
            </div>

            {/* posts */}
            {trips.map((trip, index) => (
              <PostCard trip={trip} key={index} guide={guide} />
            ))}
          </main>
        </article>
      </div>
    </section>
  );
};

export default GuideProfile;
