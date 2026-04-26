"use client";

import { BASE_API } from "@/urls/urls";
import { API_METHODS, Note } from "../types/note";
import { useState } from "react";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

export function UpdateForm({ note }: { note: Note }) {

  const router = useRouter()
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");

  const API_URL = `${BASE_API}/${note?._id}`;

  const onChangeTitle = (val: string) => {
    setTitle(val);
  };
  const onChangeContent = (val: string) => {
    setContent(val);
  };

  const onUpdate = async () => {
    try {
      if (title.trim() === note?.title && content.trim() === note?.content) {
        toast("You didn't do any change. Please update the note", {
          type: "error",
          autoClose: 2000,
        });
        return;
      }

      if (!title.trim()|| !content.trim()) {
        toast("Both fields are mandatory", {
          type: "error",
          autoClose: 2000,
        });
        return;
      }

      const response = await fetch(API_URL, {
        method: API_METHODS.PATCH,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const { status, data } = await response.json();
      toast(data.message, { type: status, autoClose: 800 });
      router.push('/')
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Something went wrong";
      toast(errorMsg, { type: "error", autoClose: 800 });
    }
  };

  const onReset = () => {
  setTitle( note?.title??"");
  setContent( note?.content??"");
};

  return (
    <form className="bg-white p-6 rounded-lg shadow-md mt-5" action={onUpdate}>
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
          type="button"
          onClick={onReset}
          className="py-4 px-6 w-full bg-white text-black border border-gray-700 rounded-sm hover:cursor-pointer hover:bg-gray-100"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
