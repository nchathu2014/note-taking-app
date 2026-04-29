import { UpdateForm } from "@/components/UpdateForm";
import { dbConnect } from "@/lib/back_db";
import { Note } from "@/models/Note";
import { BASE_API } from "@/urls/urls";
import { isValidObjectId } from "mongoose";
import { notFound } from "next/navigation";
import { ToastContainer } from "react-toastify";

const BASE_URL = process.env.NEXT_BASE_URL;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await dbConnect();
  const note = await Note.findById(id);
  if (!note) notFound();

  //OG Image Url
  const ogImageUrl = `${BASE_URL}/api/og?title=${encodeURIComponent(`Note ${note?.title}`)}&description=${encodeURIComponent("This is Note Taking App")}`;

  return {
    title: `Note:${note?.title}`,
    description: `Note detail page of ${id}`,
    openGraph:{
      title:`Note ${note?.title}`,
      description:'This is a Note Taking App',
      images:[
        {
          url:ogImageUrl,
          width:800,
          height:600,
          alt:"Og Image Alt"
        },
        {
          url:ogImageUrl,
          width:1800,
          height:1600,
          alt:"Og Image Alt"
        }
      ]
    }
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
    if (!isValidObjectId(id)) notFound();
    const response = await fetch(`${BASE_API}/${id}`, {
      cache: "no-cache", //Cache but always validate first
    });
    const responseData = await response.json();
    note = responseData?.data?.note;
  } catch (error) {
    notFound();
  }
  if (!note) notFound();
  return (
    <div className="space-y-20  flex justify-center items-center">
      <UpdateForm note={note} />
      <ToastContainer />
    </div>
  );
}
