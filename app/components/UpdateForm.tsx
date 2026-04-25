"use client"

import { Note } from "../types/note";
import { useState } from "react";

export function UpdateForm({ note }: { note: Note }) {
  const [title, setTitle] = useState(note?.title?? "");
  const [content, setContent] = useState(note?.content?? "");

  const onChangeTitle = (val: string) => {
    setTitle(val);
  };
  const onChangeContent = (val: string) => {
    setContent(val);
  };

  return (
    <form className="bg-white p-6 rounded-lg shadow-md mt-5">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold ">Update Note</h2>
      </div>

      <div className="space-y-4">
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => onChangeTitle(e.target.value)}
          placeholder="Your note title *"
          className="border border-gray-300 rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <textarea
          name="content"
          id="content"
          rows={8}
          value={content}
          onChange={(e) => onChangeContent(e.target.value)}
          placeholder="Your note content *"
          className="border border-gray-300 rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
        ></textarea>
      </div>
      <div className="flex justify-between gap-2 mt-6">
        <button
          type="submit"
          className="py-4 px-6 w-full bg-black text-white rounded-sm hover:cursor-pointer hover:bg-orange-600 hover:text-white hover:border border-orange-900"
        >
          Update
        </button>
        <button
          type="reset"
          className="py-4 px-6 w-full bg-white text-black border border-gray-700 rounded-sm hover:cursor-pointer hover:bg-gray-100"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
