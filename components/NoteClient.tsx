"use client";

import { API_METHODS, Note, NotesType } from "@/types/note";
import { BASE_API } from "@/urls/urls";
import { useState, useRef } from "react";
import Form from "next/form";
import { toast } from "react-toastify";
import { FaRegEdit, FaShare } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";

import { confirm } from "./MyDialog";
import { useRouter } from "next/navigation";

type NoteClientProps = {
  initialNotes: Note[];
};

export function NoteClient({ initialNotes }: NoteClientProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const router = useRouter();

  const createNote = async (e: React.SubmitEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(formRef.current!);
      const title = formData.get("title");
      const content = formData.get("content");

      if (title === "" || content === "") {
        toast("Both fields are mandatory", { type: "error", autoClose: 800 });
        return;
      }

      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await fetch(BASE_API, {
        method: API_METHODS.POST,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      //Reset fields

      const { status, data } = await response.json();

      if (status === "success") {
        setNotes([data?.note, ...notes]);
      }

      formRef?.current?.reset();
      toast(data.message, { type: status, autoClose: 800 });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const errorMsg =
        error instanceof Error ? error.message : "Something went wrong";
      toast(errorMsg, { type: "error", autoClose: 800 });
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const response = await fetch(`${BASE_API}/${id}`, {
        method: API_METHODS.DELETE,
      });

      const { status, data } = await response.json();
      toast(data.message, { type: status, autoClose: 3000 });

      const filteredNotes = notes?.filter((note) => note?._id !== id);
      setNotes([...filteredNotes]);
    } catch (error) {
      const errMsg =
        error instanceof Error ? error?.message : "Something went wrong";
      toast(errMsg, { type: "error", autoClose: 800 });
    }
  };

  const deleteAllNotes = async () => {
    try {
      setNotes([]);
      const response = await fetch(`${BASE_API}?confirm=true`, {
        method: API_METHODS.DELETE,
      });

      const { status, data } = await response.json();
      if (status === "success") {
        setNotes([]);
      }
      toast(data.message, { type: status, autoClose: 800 });
    } catch (error) {
      const errMsg =
        error instanceof Error ? error?.message : "Something went wrong";
      toast(errMsg, { type: "error", autoClose: 800 });
    }
  };

  const handleDelete = async (): Promise<void> => {
    // Fully type-safe: message is required, result is boolean
    const result = await confirm({
      message: "Are you sure you want to DELETE all notes?",
    });

    if (result) {
      // User confirmed - proceed with deletion
      deleteAllNotes();
    }
  };

  const onShareClick =  () => {
   navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const onSearch = () => {
    const filteredNotes = notes?.filter((note) =>
      note?.title.toLowerCase().includes(search.toLowerCase()),
    );

    setNotes((prevNotes) => [...prevNotes, ...filteredNotes]);
  };
  return (
    <>
      <div className="space-y-6 md:w-lg">
        <form
          ref={formRef}
          onSubmit={(e) => createNote(e)}
          className=" mx-auto bg-white p-6 rounded-lg shadow-md mt-5"
        >
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-semibold ">Create a New Note</h2>
          </div>

          <div className="space-y-4">
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Your note title *"
              disabled={loading}
              className={`border border-gray-300 rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 ${loading ? "disabled:bg-gray-200 disabled:cursor-not-allowed" : ""}`}
            />
            <textarea
              name="content"
              id="content"
              disabled={loading}
              placeholder="Your note content *"
              className={`border border-gray-300 rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 ${loading ? "disabled:bg-gray-200 disabled:cursor-not-allowed" : ""}`}
            ></textarea>
          </div>
          <div className="flex justify-between gap-2 mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`py-4 px-6 w-full bg-black text-white rounded-sm hover:cursor-pointer hover:bg-orange-600 hover:text-white hover:border border-orange-900 ${loading ? "disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300 disabled:border-none" : ""}`}
            >
              <IoCreateOutline className="inline text-lg mr-2" />
              {loading ? "Creating..." : "Create"}
            </button>
            <button
              type="reset"
              className="py-4 px-6 w-full bg-white text-black border border-gray-700 rounded-sm hover:cursor-pointer hover:bg-gray-100"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      {notes?.length === 0 ? (
        <div className=" bg-gray-100 border-2 shadow-sm border-gray-500 mt-10 p-5 rounded-lg font-semibold">
          No Notes Yet. Create Your First Note & Enjoy :)
        </div>
      ) : (
        <div className="space-y-4">
          {notes?.length >= 2 && (
            <div className="flex justify-center gap-2 mt-5">
              <button
                className="py-2  px-3 max-w-2xl rounded-md bg-red-600 text-white hover:bg-red-800 hover:cursor-pointer"
                onClick={handleDelete}
              >
                Delete All
              </button>

              <button
                className="py-2  px-3 max-w-2xl rounded-md bg-gray-300 text-black hover:bg-gray-400 hover:cursor-pointer"
                onClick={onShareClick}
              >
                Share <FaShare className="inline ml-1" />
              </button>
            </div>
          )}
          <div className="flex flex-col items-center justify-center">
            <h2 className="flex justify-center text-xl font-semibold mt-3">
              <FaNoteSticky className="mt-1 mr-2 mb-4" /> Your Notes (
              {notes?.length})
            </h2>

            {/* <input
                type="text"
                onChange={(e)=>setSearch(e.target.value)}
                placeholder="Search by note title"
                className="border border-gray-400 rounded py-2 px-3 focus:outline-none"
              /> */}
          </div>

          <div className="flex flex-wrap grow gap-3 m-5 justify-center">
            {notes?.map((note) => (
              <div
                key={note?._id}
                className={`bg-white p-6 rounded-lg shadow-md hover:bg-gray-100 `}
              >
                <div className="flex  justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold truncate w-full max-w-xs">
                    {note?.title}
                  </h3>
                </div>
                <p className="text-gray-700 mb-2 truncate w-full max-w-xs ">
                  {note?.content}
                </p>

                <div className="flex flex-col gap-1">
                  <p className="text-xs text-gray-500">
                    Created: {new Date(note?.createdAt).toLocaleString("en-US")}
                  </p>
                  {note?.createdAt !== note?.updatedAt && (
                    <p className="text-xs text-gray-500">
                      Updated:{" "}
                      {new Date(note?.updatedAt).toLocaleString("en-US")}
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-2 mt-5">
                  <button
                    className="text-blue-500 hover:text-blue-700 hover:cursor-pointer"
                    onClick={() => router.push(`/notes/${note?._id}`)}
                  >
                    <FaRegEdit className="text-lg" />
                  </button>
                  <button className="text-red-500 hover:text-red-700 hover:cursor-pointer">
                    <RiDeleteBin6Line
                      className="text-lg"
                      onClick={() => deleteNote(note?._id!)}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
