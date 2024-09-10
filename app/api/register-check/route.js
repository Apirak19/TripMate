import connectionPool from "@/utils/supabase/connectionPool";
export async function POST(req) {
  const body = await req.json();
  try {
    if (body.check === "username") {
      console.log("check username");
      const result = await connectionPool.query(
        `SELECT * FROM users
      WHERE user_username = $1`,
        [body.input]
      );
      const isDuplicated = Boolean(result.rowCount);
      console.log("username duplicated", isDuplicated);
      return new Response(JSON.stringify(isDuplicated), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else if (body.check === "email") {
      console.log("check username");
      const result = await connectionPool.query(
        `SELECT * FROM users
         WHERE user_email = $1`,
        [body.input]
      );
      const isDuplicated = Boolean(result.rowCount);
      console.log("email duplicated", isDuplicated);
      return new Response(JSON.stringify(isDuplicated), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (err) {
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
