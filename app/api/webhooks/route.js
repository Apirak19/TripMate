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

      // Update the transaction record to mark it as paid
      await connectionPool.query(
        `
        UPDATE transactions
        SET is_paid = true
        WHERE session_id = $1
        `,
        [session.id]
      );

      break;

    // Add more cases to handle other event types if necessary

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  return new NextResponse("Event received", { status: 200 });
}
