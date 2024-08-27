export async function POST(req) {
  const body = await req.body;
  console.log("body: ", body);
  return new Response(JSON.stringify("fetched"), { status: 200 });
}
