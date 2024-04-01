import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/dataFromToken";

connect();

export async function POST(request: NextRequest) {
  //extract data from token

  const userId = await getDataFromToken(request);

  const user = await User.findOne({ _id: userId }).select("-password");

  if (!user) {
    return NextResponse.json({ error: "user not found" });
  }

  return NextResponse.json({
    message: "User Found",
    data: user,
  });
}
