import Stripe from "stripe";
import connectionPool from "@/utils/supabase/connectionPool";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  const buf = await req.arrayBuffer();
  const sig = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(buf),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      const bookingId = session.metadata.booking_id;
      const guideId = session.metadata.guide_id;
      const startDate = new Date(session.metadata.start_date);
      const endDate = new Date(session.metadata.end_date);

      try {
        // Update the "pending" booking to "confirmed"
        await connectionPool.query(
          `
          UPDATE booking
          SET status = 'success'
          WHERE booking_id = $1
          `,
          [bookingId]
        );
      } catch (err) {
        console.error("Database query failed.", err.message);
        return new NextResponse(`Database Error: ${err.message}`, {
          status: 500,
        });
      }

      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new NextResponse("Event received", { status: 200 });
}
