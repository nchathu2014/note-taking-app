import { dbConnect } from "@/lib/back_db";
import { NoteClient } from "./components/NoteClient";
import { ToastContainer } from "react-toastify";
import { Note } from "@/models/Note";

const fetchAllNotes = async () => {
  await dbConnect();
  const notes = await Note.find({}).sort({ createdAt: -1 }).lean();
  return notes?.map((note) => ({
    ...note, // converts Mongoose object to plain JS object
    _id: note?._id.toString(),
  }));
};

export default async function Home() {
  const notes = await fetchAllNotes();
  return (
    <div className="bg-gray-200 flex flex-col min-h-screen">
      

      <main className="flex flex-col justify-center items-center">
        <NoteClient initialNotes={notes} />
        <ToastContainer />
      </main>

      
    </div>
  );
}
