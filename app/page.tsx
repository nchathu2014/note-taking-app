import { dbConnect } from "@/lib/back_db";
import { NoteClient } from "../components/NoteClient";
import { ToastContainer } from "react-toastify";
import { Note } from "@/models/Note";
import { BASE_API } from "@/urls/urls";

export default async function NotesHome() {
  await dbConnect();
  const response = await fetch(BASE_API, {
    cache: "no-cache", //Cache but always validate first
  });

  const responseData = await response.json();

  return (
    <div className="bg-gray-200 flex flex-col min-h-screen">
      <main className="flex flex-col justify-center items-center">
        <NoteClient initialNotes={responseData?.data?.notes} />
        <ToastContainer />
      </main>
    </div>
  );
}
