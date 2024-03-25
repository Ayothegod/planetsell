import { migrate } from "drizzle-orm/node-postgres/migrator";
import { client, db } from "./db";
// src/db/migrations

const connectDb = async () => {
  try {
    await migrate(db, {
      migrationsFolder: "./migrations",
      migrationsTable: "my_migrations",
    });
    console.log("migrations successful");
    await client.end();
  } catch (error) {
    console.log(error);
    console.log("error");
    process.exit(1);
  }
};
connectDb();

