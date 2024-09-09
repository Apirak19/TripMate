import connectionPool from "@/utils/supabase/connectionPool";
import * as bcrypt from "bcrypt";

export async function POST(req) {
  const body = await req.json();
  console.log(body);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, salt);

  try {
    const result = await connectionPool.query(
      `INSERT INTO users (user_firstname, user_lastname, user_username, user_date_of_birth, user_email, user_password) VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        body.firstname,
        body.lastname,
        body.username,
        body.dateOfBirth,
        body.email,
        hashedPassword,
      ]
    );

    //  if (result.rows.length !== 0) {
    //    const hasPassword = await connectionPool.query(
    //      `SELECT *
    //        FROM users
    //        WHERE user_email = $1
    //        AND
    //        user_password = 'hashed_password_1'`,
    //      [body.email]
    //    );
    //    console.log("matched: ", hasPassword.rows[0]);
    //  } else {
    //    return new Response(
    //      JSON.stringify({ message: "email or password is incorrect" }),
    //      {
    //        status: 404,
    //        headers: {
    //          "Content-Type": "application/json",
    //        },
    //      }
    //    );
    //  }

    return new Response(JSON.stringify({ body }), {
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
