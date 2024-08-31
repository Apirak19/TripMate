// import { NextRequest, NextResponse } from "next/server";
import connectionPool from "@/utils/supabase/connectionPool";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export async function POST(req) {
  const {
    checkoutTitle,
    guide_id,
    user_id,
    startDate,
    endDate,
    total
  } = await req.json();

  try {
    const { rows } = await connectionPool.query(
      `
      SELECT 1
      FROM booking
      WHERE guide_id = $1
        AND (
          ($2::date BETWEEN booking_start_date AND booking_end_date) OR
          ($3::date BETWEEN booking_start_date AND booking_end_date) OR
          (booking_start_date BETWEEN $2::date AND $3::date) OR
          (booking_end_date BETWEEN $2::date AND $3::date)
        )
        AND status = 'success';
      `,
      [guide_id, startDate, endDate]
    );

    if (rows.length > 0) {
      // The guide is already booked for the requested dates
      return new NextResponse("Guide is not available for the selected dates", {
        status: 409,
      });
    }

    const { rows: bookingRows } = await connectionPool.query(
      `
      INSERT INTO booking (guide_id, user_id, booking_start_date, booking_end_date, status)
      VALUES ($1, $2, $3::date, $4::date, 'pending')
      RETURNING booking_id
      `,
      [guide_id, user_id, startDate, endDate]
    );

    const bookingId = bookingRows[0].booking_id;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "thb",
            product_data: {
              name: checkoutTitle,
            },
            unit_amount: total * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
      metadata: {
        guide_id: guide_id,
        booking_id: bookingId,
        start_date: startDate,
        end_date: endDate,
      },
    });

    // const result = await connectionPool.query(
    //   `
    //   INSERT INTO transactions (is_paid, session_id, booking_id)
    //   VALUES (false, $1, $2)
    //   RETURNING *
    //   `,
    //   [session.id, booking_id]
    // );

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      "Content-Type": "application/json",
    });
  } catch (error) {
    console.error("Internal Error:", error.message);
    // Handle other errors (e.g., network issues, parsing errors)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      "Content-Type": "application/json",
    });
  }
}
