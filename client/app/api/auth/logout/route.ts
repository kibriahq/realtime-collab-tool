import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");

    return NextResponse.json({ message: "Logout successful", status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Logout failed", status: 500 });
  }
}
