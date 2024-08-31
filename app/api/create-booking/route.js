import connectionPool from "@/utils/supabase/connectionPool";

export async function POST(req) {
  try {
    const body = await req.json();
    const { guide_id, user_id, startDate, endDate, isOneDayTrip } = body;
    const result = await connectionPool.query(
      `INSERT INTO booking (guide_id, user_id, booking_start_date, booking_end_date) 
      VALUES ($1, $2, $3, $4) RETURNING *`,
      [guide_id, user_id, startDate, endDate]
    );
    const resultRow = result.rows[0]
    console.log("result", resultRow);

    return new Response(JSON.stringify(resultRow), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
}
