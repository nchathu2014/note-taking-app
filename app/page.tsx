import { dbConnect } from "@/lib/back_db";
import { Note } from "./components/notes/Note";
  import { ToastContainer} from 'react-toastify';

export default async function Home() {
  await dbConnect();
  return (
    <div className="flex flex-col h-screen p-10 bg-gray-800 font-sans dark:bg-black">
      <main>
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          Note Taking App
        </h1>
       
        <Note/>
        <ToastContainer/>
      </main>
    </div>
  );
}
