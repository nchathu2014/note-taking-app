import { UpdateForm } from "@/components/UpdateForm";
import { dbConnect } from "@/lib/back_db";
import { Note } from "@/models/Note";
import { BASE_API } from "@/urls/urls";
import { isValidObjectId } from "mongoose";
import { notFound } from "next/navigation";
import { ToastContainer } from "react-toastify";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!isValidObjectId(id)) notFound();

  await dbConnect();
  const note = await Note.findById(id);
  if (!note) notFound();

  return {
    title: `Note: ${note?.title}`,
    description: `Note detail page of ${id}`,
  };
}

export default async function NoteUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let note = null;
  try {
    const { id } = await params;
    const response = await fetch(`${BASE_API}/${id}`, {
      cache: "no-cache", //Cache but always validate first
    });
    const responseData = await response.json();
    note = responseData?.data?.note;
  } catch (error) {
    return {
      status: "fail",
      data: {
        message: "Not Found",
      },
    };
  }

  return (
    <div className="space-y-20  flex justify-center items-center">
      <UpdateForm note={note} />
      <ToastContainer />
    </div>
  );
}
