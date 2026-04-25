import { dbConnect } from "@/lib/back_db";
import { Note } from "@/models/Note";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

/**
 * Fetch one Note
 * @param request
 * @param param1
 * @returns
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const { id } = await params;
    // validate ObjectId format before querying
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          status: "fail",
          data: {
            message: "Not a valid ID format",
          },
        },
        { status: 400 },
      );
    }

    const note = await Note.findById(id);
    if (!note) {
      return NextResponse.json(
        {
          status: "fail",
          data: {
            message: "Requested note is not found",
          },
        },
        { status: 404 },
      );
    }
    //success
    return NextResponse.json(
      {
        status: "success",
        data: {
          message: "Note found successfully",
          note,
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
            error instanceof Error ? error?.message : "Something went wrong",
        },
      },
      { status: 500 },
    );
  }
}

/**
 * Removing a Note
 * @param request
 * @param param1
 * @returns
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const { id } = await params;
    // validate ObjectId format before querying
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          status: "fail",
          data: {
            message: "Not a valid ID format",
          },
        },
        { status: 400 },
      );
    }

    const note = await Note.findById(id);
    if (!note) {
      return NextResponse.json(
        {
          status: "fail",
          data: {
            message: "Requested note is not found",
          },
        },
        { status: 404 },
      );
    }
    //delete
    await Note.findOneAndDelete({ _id: id });
    return NextResponse.json(
      {
        status: "success",
        data: {
          message: "Note deleted successfully",
        },
      },
      { status: 201 }, // This can be vary based on the business requirement. In some cases it might be 204
    );
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
 * Update Note Details
 * @param request
 * @param param1
 * @returns
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const { id } = await params;
    // validate ObjectId format before querying
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          status: "fail",
          data: {
            message: "Not a valid ID format",
          },
        },
        { status: 400 },
      );
    }

    const note = await Note.findById(id);
    if (!note) {
      return NextResponse.json(
        {
          status: "fail",
          data: {
            message: "Requested note is not found",
          },
        },
        { status: 404 },
      );
    }
    //update
    const body = await request.json();
    await Note.findByIdAndUpdate(id, body);
    return NextResponse.json(
      {
        status: "success",
        data: {
          message: "Note updated successfully",
          note,
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
            error instanceof Error ? error?.message : "Something went wrong",
        },
      },
      { status: 500 },
    );
  }
}
