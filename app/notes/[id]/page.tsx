import { UpdateForm } from "@/app/components/UpdateForm";
import { Note } from "@/models/Note";

const fetchNoteById = async (id: string) => {
  try {
    const note = await Note.findById(id).lean();
    const noteObj = {...note.toObject()};
    return noteObj;
  } catch (error) {}
};

export default async function NoteUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

    const { id } = await params;
    const note = await fetchNoteById(id);


  return (
    <div className="space-y-20  flex justify-center items-center">
      <UpdateForm note={note} />
    </div>
  );
}
