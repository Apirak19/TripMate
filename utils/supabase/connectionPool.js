import { Pool } from "pg";

const connectionPool = new Pool({
  host: "aws-0-ap-southeast-1.pooler.supabase.com",
  user: "postgres.insumhxhpcxbcejzoixb",
  database: "postgres",
  password: "thailandtravelguidev2",
  port: "6543",
});

export default connectionPool;
