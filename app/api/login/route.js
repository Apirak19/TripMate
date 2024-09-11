import connectionPool from "@/utils/supabase/connectionPool";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const body = await req.json();
  const jwtSecret = process.env.JWT_SECRET;

  try {
    console.log(jwtSecret);
    const result = await connectionPool.query(
      `SELECT *
   FROM users
   where user_email = $1`,
      [body.email]
    );

    if (result.rows.length === 0) {
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
    const user = result.rows[0];
    const { user_password, ...userData } = user;
    const validPassword = await bcrypt.compare(
      body.password,
      user.user_password
    );

    if (!validPassword) {
      return new Response(
        JSON.stringify({ message: "invalid email or password" }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    console.log("user data to return:", userData);

    // JWT
    const token = jwt.sign(result.rows[0], jwtSecret, { expiresIn: "1h" });

    return new Response(JSON.stringify({ userData }), {
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
