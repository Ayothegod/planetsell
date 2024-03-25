import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import "dotenv/config"

export const client = new Client({
  connectionString: process.env.DATABASE_URL,
});
client.connect();
export const db = drizzle(client);

const connectDb = async () => {
  console.log("starting working");
  try {
  await migrate(db, {
    migrationsFolder: "src/db/migrations",
    migrationsTable: "my_migrations",
  });
  console.log("migrations successful");
  await client.end();
  } catch (error) {
    console.log("error");
    console.log(error);
    process.exit(0);
  }
};
connectDb();
