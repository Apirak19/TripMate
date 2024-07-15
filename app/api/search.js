import connectionPool from "@/db/connectionPool";

export default async function GET(req, res) {
  try {
    const result = await connectionPool.query(`select * from tags`);
    return res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ error: "Error fetching users" });
  }
}
