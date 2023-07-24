import { NextResponse } from "next/server";
import connectMongo from "@database/connect";
import Users from "@model/Schema";
import bcrypt from "bcrypt";

export async function POST(request) {
  connectMongo().catch((error) => res.json({ error: error.message }));

  if (request.method === "POST") {
    if (!request.body) {
      return NextResponse.json({
        error: "Don't have form data...!",
      });
    }
    const { username, email, password } = request.body;
    console.log(request.body);
    const checkExisting = await Users.findOne({ email });

    if (checkExisting) {
      return NextResponse.json({
        message: "User already exists...!",
      });
    }

    const data = await Users.create({
      username,
      email,
      password,
    });

    if (data) {
      return NextResponse.json({ status: true, user: data });
    } else {
      return NextResponse.json({ err: err.message });
    }
  } else {
    return NextResponse.json({
      message: "HTTP method not valid only POST Accepted...!",
    });
  }
}
