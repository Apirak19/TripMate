// import { NextRequest, NextResponse } from "next/server";
import connectionPool from "@/utils/supabase/connectionPool";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export async function POST(req) {
 

  try {
    const body = await req.json();
    const { checkoutTitle, total } = await body;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "thb",
            product_data: {
              name: checkoutTitle,
            },
            unit_amount: total*100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    const result = await connectionPool.query(
      `
      INSERT INTO transactions (is_paid, session_id)
      VALUES (false, $1)
      RETURNING *
      `,
      [session.id]
    );

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      "Content-Type": "application/json",
    });
  } catch (error) {
    console.error("Internal Error:", error);
    // Handle other errors (e.g., network issues, parsing errors)
    return new Response(JSON.stringify({ error: true }), {
      status: 400,
      "Content-Type": "application/json",
    });
  }
}
