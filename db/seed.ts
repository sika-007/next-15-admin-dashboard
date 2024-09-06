import "@/db/env-config";
import { customers, invoices, revenue, users } from "@/lib/placeholder-data";
import db from "./drizzle";
import * as schema from "./schema";
import { exit } from "process";

const main = async () => {
  try {
    // Transaction ensure that the database operations carried out within them are atomic. This will mean that if one operation fails, all of them fail
    await db.transaction(async (tx) => {
      // Clean database
      await tx.delete(schema.revenue);
      await tx.delete(schema.invoices);
      await tx.delete(schema.customers);
      await tx.delete(schema.users);

      // Seed database
      await tx.insert(schema.users).values(users);
      await tx.insert(schema.customers).values(customers);
      await tx.insert(schema.invoices).values(invoices);
      await tx.insert(schema.revenue).values(revenue);
    });

    console.log("Database seeded successfully");
    exit(0);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
