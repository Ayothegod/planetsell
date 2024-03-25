import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Client } from "pg";

export const client = new Client({
  connectionString:
    "postgres://postgres:postgrespass@localhost:5432/planetsell",
});
client.connect();
export const db = drizzle(client);
const connectDb = async () => {

  try {
    await migrate(db, {
      migrationsFolder: "src/db/migrations",
      migrationsTable: "my_migrations",
    });
    console.log("migartions successful");
  } catch (error) {
    console.log(error);
    console.log("error");
    process.exit(1);
  }
};
connectDb();

// await client.end();
// export default db;
