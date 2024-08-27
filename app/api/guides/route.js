import connectionPool from "@/utils/supabase/connectionPool";

export async function POST(req) {
  const body = await req.json();
  console.log("body", body);
  if (body.action === "getAll") {
    try {
      const result = await connectionPool.query(`WITH avg_ratings AS (
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
ORDER BY ar.avg_rating DESC
`);

      // Return the result as JSON
      return new Response(JSON.stringify({ data: result.rows }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error fetching tags", error);
      // Return error response
      return new Response(JSON.stringify({ error: "Error fetching tags" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } else if (body.action === "filter") {
    if (body.sort) {
      console.log("body.sort: ", body.sort);
    }

    const conditionKeys = Object.keys(body.values);
    const conditionValues = Object.values(body.values);
    let whereCondition = "";
    let queryValues = [];
    const sortOptions = {
      Rating: "ar.avg_rating",
      Trips: "tc.trip_count",
      Followers: "f.followers",
    };
    const ageOption = {
      Young: "g.guide_age BETWEEN 15 AND 25",
      Middle: "g.guide_age BETWEEN 25 AND 40",
      Senior: "g.guide_age BETWEEN 40 AND 100",
    };
    const ratingOption = {
      Average: "ar.avg_rating BETWEEN 0 AND 3",
      Good: "ar.avg_rating BETWEEN 3 AND 4",
      Excellent: "ar.avg_rating BETWEEN 4 AND 5",
    };

    conditionKeys.forEach((key, index) => {
      if (key === "Age" && ageOption[conditionValues[index]]) {
        if (whereCondition.length > 0) {
          whereCondition += " AND ";
        }
        whereCondition += ageOption[conditionValues[index]];
      } else if (key === "Rating" && ratingOption[conditionValues[index]]) {
        if (whereCondition.length > 0) {
          whereCondition += " AND ";
        }
        whereCondition += ratingOption[conditionValues[index]];
      } else if (key === "Region") {
        if (whereCondition.length > 0) {
          whereCondition += " AND ";
        }
        whereCondition += `$${
          queryValues.length + 1
        } = ANY(g.guide_preferred_region)`;
        queryValues.push(conditionValues[index]);
      } else if (key === "Language") {
        if (whereCondition.length > 0) {
          whereCondition += " AND ";
        }
        whereCondition += `$${queryValues.length + 1} = ANY(g.guide_language)`;
        queryValues.push(conditionValues[index]);
      } else if (key === "Gender") {
        if (whereCondition.length > 0) {
          whereCondition += " AND ";
        }
        whereCondition += `g.guide_gender = $${queryValues.length + 1}`;
        queryValues.push(conditionValues[index]);
      }
    });
    const query = `WITH avg_ratings AS (
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
${conditionKeys.length !== 0 ? `WHERE ${whereCondition}` : ""} 
${
  body.sort
    ? `ORDER BY ${sortOptions[body.sort.Sort]} ${body.sort.Desc ? "DESC" : ""}`
    : `ORDER BY ar.avg_rating DESC`
}
`;

    console.log("conditionKeys", conditionKeys);
    console.log("conditionValues", conditionValues);
    console.log("whereCondition", whereCondition);
    console.log("queryValues", queryValues);
    console.log("query", query);

    const data = await connectionPool.query(query, queryValues);
    console.log("result", data.rows);

    return new Response(JSON.stringify(data.rows), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

}
