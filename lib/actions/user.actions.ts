"use server";

import { error } from "console";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { users } from "@/db/schema";
import db from "@/db/drizzle";
import { eq } from "drizzle-orm";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials";
        default:
          return "Something went wrong";
      }
    }
  }

  throw new Error();
}

export async function getUser(email: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email as string),
  });
  if (!user) throw new Error("User not found");
  return user;
}
