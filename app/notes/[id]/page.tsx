import { UpdateForm } from "@/app/components/UpdateForm";
import { Note } from "@/models/Note";
import { BASE_API } from "@/urls/urls";
import { ToastContainer } from "react-toastify";

// const fetchNoteById = async (id: string) => {
//   try {
//     const note = await Note.findById(id).lean();
//     const noteObj = {...note.toObject()};
//     return noteObj;
//   } catch (error) {}
// };

export default async function NoteUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetch(`${BASE_API}/${id}`, {
    cache: "no-cache",
  });
  const responseData = await response.json();
  const note = responseData?.data?.note;

  return (
    <div className="space-y-20  flex justify-center items-center">
      <UpdateForm note={note} />
      <ToastContainer/>
    </div>
  );
}
