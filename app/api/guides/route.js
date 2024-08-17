import connectionPool from "@/utils/supabase/connectionPool";

export async function POST(req) {
  const body = await req.json();
  console.log("body", body);
  if (body.action === "getAll") {
    try {
      const result = await connectionPool.query(`select * from guides g
            inner join (select guide_id, AVG(rating) from guide_rating
            group by guide_id) as gr
            on g.guide_id = gr.guide_id
            order by gr.avg desc;`);

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
    const conditionKeys = Object.keys(body.values);
    const conditionValues = Object.values(body.values);
    let whereCondition = "";
    let queryValues = [];
    const columnName = {
      Region: "g.guide_preferred_region",
      Gender: "g.guide_gender",
      Language: "g.guide_language",
    };
    const ageOption = {
      Young: "g.guide_age BETWEEN 15 AND 25",
      Middle: "g.guide_age BETWEEN 25 AND 40",
      Senior: "g.guide_age BETWEEN 40 AND 100",
    };
    const ratingOption = {
      Average: "gr.guide_age BETWEEN 0 AND 3",
      Good: "gr.guide_age BETWEEN 3 AND 4",
      Excellent: "gr.guide_age BETWEEN 4 AND 5",
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
      } else if (columnName[key]) {
        if (whereCondition.length > 0) {
          whereCondition += " AND ";
        }
        whereCondition += `${columnName[key]} = $${queryValues.length + 1}`;
        queryValues.push(conditionValues[index]);
      }
    });
    const query = `select * from guides g
    inner join (select guide_id, AVG(rating) from guide_rating
    group by guide_id) as gr
    on g.guide_id = gr.guide_id
    WHERE ${whereCondition}
    order by gr.avg desc;`;

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

    // if ("Age" in body.values) {
    //   try {
    //     const result = await connectionPool.query(`SELECT * FROM guides g
    //       INNER JOIN (SELECT guide_id, AVG(rating) AS avg FROM guide_rating
    //       GROUP BY guide_id) AS gr
    //       ON g.guide_id = gr.guide_id
    //       WHERE g.age = 25
    //       ORDER BY gr.avg DESC;`);

    //     // Return the result as JSON
    //     return new Response(JSON.stringify({ data: result.rows }), {
    //       status: 200,
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });
    //   } catch (error) {
    //     return new Response(JSON.stringify({ error: "Error fetching tags" }), {
    //       status: 500,
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });
    //   }
    // }
  }

  // else {
  //   return new Response(JSON.stringify({ body: body }));
  // }

  // if (body.action === "filter") {
  //    if ("age" in body.values) {
  //       const { age } = body.values;
  //       console.log("filter by age");
  //       console.log("age", age);

  //     try {
  //       const result = await connectionPool.query(`select * from guides g
  //             inner join (select guide_id, AVG(rating) from guide_rating
  //             group by guide_id) as gr
  //             on g.guide_id = gr.guide_id
  //             order by gr.avg desc;`);

  //       // Return the result as JSON
  //       return new Response(JSON.stringify({ data: result.rows }), {
  //         status: 200,
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //     } catch (error) {
  //       console.error("Error fetching tags", error);
  //       // Return error response
  //       return new Response(JSON.stringify({ error: "Error fetching tags" }), {
  //         status: 500,
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //     }
  //   }
  // }
}
