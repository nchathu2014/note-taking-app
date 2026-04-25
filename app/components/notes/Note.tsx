"use client";

import { API_METHODS, NotesType } from "@/app/types/note";
import { BASE_API } from "@/urls/urls";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export function Note() {
  const [notes, setNotes] = useState<NotesType>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchAllNotes = async () => {
    const res = await fetch(BASE_API);
    const resData = await res.json();
    setNotes(resData?.data);
  };

  const createNote = async () => {
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
    setTitle("");
    setContent("");

    const { status, data } = await response.json();
    toast(data.message, { type: status,autoClose: 3000 });
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);

  console.log('effefefef')

  const onTitleChange = (val: string) => {
    const title = val.trim();
    setTitle(title);
  };

  const onContentChange = (val: string) => {
    const content = val.trim();
    setContent(content);
  };

  const isNoteAvailable = notes?.total === 0;

  if (isNoteAvailable) return <div>Create a Note & Enjoy :)</div>;

  return (
    <div className="space-y-6 w-lg">
      <form
        action={createNote}
        className="bg-white p-6 rounded-lg shadow-md mt-5"
      >
        <h2 className="text-xl font-semibold mb-4">Create a New Note</h2>
        <div className="space-y-4">
          <input
            id="title"
            name="title"
            type="text"
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Your note title *"
            className="border border-gray-300 rounded-lg py-3 px-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <textarea
            name="content"
            id="content"
            rows={8}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="Your note content *"
            className="border border-gray-300 rounded-lg py-3 px-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></textarea>
        </div>
        <div className="flex justify-between gap-2 mt-6">
          <button
            type="submit"
            className="py-4 px-6 w-full bg-blue-700 text-white rounded-sm hover:cursor-pointer hover:bg-blue-950"
          >
            Create
          </button>
          <button
            type="reset"
            className="py-4 px-6 w-full bg-red-500 text-white rounded-sm hover:cursor-pointer hover:bg-red-800"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
