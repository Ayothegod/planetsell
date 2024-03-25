import { db } from "@/db/migrate";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import { generateId } from "lucia";
import { userTable, sessionTable } from "@/db/schema";
import { eq, lt, gte, ne } from "drizzle-orm";

export default async function Page() {
  return (
    <>
      <h1>Create an account</h1>
      <form action={signup}>
        <label htmlFor="username">Username</label>
        <input
          placeholder="username"
          className=""
          name="username"
          id="username"
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          placeholder="password"
          type="password"
          name="password"
          id="password"
        />
        <br />
        <button>Continue</button>
      </form>
    </>
  );
}

async function signup(formData: FormData) {
  "use server";
  console.log("start signup");
  try {
    const username = formData.get("username");
    if (
      typeof username !== "string" ||
      username.length < 3 ||
      username.length > 31 
    //   || !/^[a-z0-9_-]+$/.test(username)
    ) {
      return console.log("Invalid username");
    }
    const password = formData.get("password");
    if (
      typeof password !== "string" ||
      password.length < 6 ||
      password.length > 255
    ) {
      return console.log("Invalid password");
    }

    const hashedPassword = await new Argon2id().hash(password);
    const userId = generateId(15);

    // TODO: check if username is already used
    const userExist = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, userId));
    console.log(userExist);

    if (userExist.length > 0) {
      return console.log("User already exist! please sign in.");
    }

    const user = await db.insert(userTable).values({
      id: userId,
      username: username,
      password: hashedPassword,
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    console.log("complete signup");
    console.log(user);
    // return redirect("/");
  } catch (error) {
    console.log(error);
  }
}
