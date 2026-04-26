import { dbConnect } from "@/lib/back_db";
import { NoteClient } from "../components/NoteClient";
import { ToastContainer } from "react-toastify";
import { Note } from "@/models/Note";
import { BASE_API } from "@/urls/urls";

//export const dynamic = "force-dynamic";

const fetchAllNotes = async () => {
  // await dbConnect();
  // const notes = await Note.find({}).sort({ createdAt: -1 }).lean();
  // return notes?.map((note) => ({
  //   ...note, // converts Mongoose object to plain JS object
  //   _id: note?._id.toString(),
  // }));
};

export default async function Home() {
  //const notes = await fetchAllNotes();
  await dbConnect();
  const response = await fetch(BASE_API, {
    cache: "no-store",
  });

  const responseData = await response.json();
  console.log(JSON.stringify(responseData?.data));

  return (
    <div className="bg-gray-200 flex flex-col min-h-screen">
      <main className="flex flex-col justify-center items-center">
        <NoteClient initialNotes={responseData?.data?.notes} />
        <ToastContainer />
      </main>
    </div>
  );
}
