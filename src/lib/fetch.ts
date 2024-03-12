// async fetch calls here

// import { unstable_noStore as noStore } from "next/cache";

// export async function getSingleUserById(id: any) {
//   noStore();
//   try {
//     const db = await dbInstance();
//     const user = await db
//       .collection("users")
//       .findOne({ _id: new ObjectId(id) });
//     return user;
//   } catch (error) {
//     console.log(error);
//     throw new Error("Cant fetch single user");
//   }
// }
