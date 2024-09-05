import connectionPool from "@/utils/supabase/connectionPool";

export async function POST(req) {
  const body = await req.json();

  try {
    const result = await connectionPool.query(
      `SELECT *
   FROM users
   where user_email = $1`,
      [body.email]
    );

    if (result.rows.length !== 0) {
      const hasPassword = await connectionPool.query(
        `SELECT *
         FROM users
         WHERE user_email = $1
         AND
         user_password = 'hashed_password_1'`,
        [body.email]
      );
      console.log("matched: ", hasPassword.rows[0]);
    } else {
      return new Response(
        JSON.stringify({ message: "email or password is incorrect" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    //   if (!hasEmail)
    return new Response(JSON.stringify({ data: result.rows[0] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
