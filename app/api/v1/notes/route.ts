import { dbConnect } from "@/lib/back_db";
import { Note } from "@/models/Note";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * Fetch All Notes
 * @param request
 * @returns
 */
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

/**
 * Create a Note
 * @param request
 * @returns
 */
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const note = await Note.create(body);
    revalidatePath('/')

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

/**
 * Delete all notes
 * @param request
 * @returns
 */
export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    //Check the confirmation to delete all operation
    const searchParams = request.nextUrl.searchParams;
    const confirm = searchParams.get("confirm");

    if (confirm !== "true") {
      return NextResponse.json(
        {
          status: "fail",
          data: {
            message: "Please add ?confirm=true to confirm deleting all notes",
          },
        },
        { status: 400 },
      );
    }

    const result = await Note.deleteMany({});
    revalidatePath('/')
    return NextResponse.json(
      {
        status: "success",
        data: {
          message: "All notes deleted successfully!",
          deletedCount: result.deletedCount,
        },
      },
      { status: 200 },
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
