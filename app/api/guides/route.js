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
  }

  if (body.action === "filter") {
     if ("age" in body.values) {
        const { age } = body.values;
        console.log("filter by age");
        console.log("age", age);
        
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
    }
  }
}
