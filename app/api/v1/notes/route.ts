import { dbConnect } from "@/lib/back_db";
import { Note } from "@/models/Note";
import { NextRequest, NextResponse } from "next/server";

// Fetch All Notes
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const notes = await Note.find();
    return NextResponse.json({
      status: "success",
      data: {
        notes,
        total: notes?.length,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        data: {
          message:
            error instanceof Error ? error?.message : "Something went wrong",
        },
      },
      { status: 500 },
    );
  }
}

//Create a Note
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
          message:
            error instanceof Error ? error.message : "Something went wrong",
        },
      },
      { status: 500 },
    );
  }
}
