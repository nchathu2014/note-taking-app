import { dbConnect } from "@/lib/back_db";
import { Note } from "@/models/Note";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const note = await Note.create(body);

    return NextResponse.json(
      {
        status: "success",
        data: {
          message: "Note saved successfully!",
          note,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        data: {
          message: "Something went wrong",
          errorStackTrace: error,
        },
      },
      { status: 500 },
    );
  }
}
