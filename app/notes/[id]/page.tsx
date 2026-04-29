import { UpdateForm } from "@/components/UpdateForm";
import { BASE_API } from "@/urls/urls";
import { ToastContainer } from "react-toastify";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return {
    title: `Note: ${id}`,
    description: `Note detail page of ${id}`,
  };
}

export default async function NoteUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetch(`${BASE_API}/${id}`, {
    cache: "no-cache", //Cache but always validate first
  });
  const responseData = await response.json();
  const note = responseData?.data?.note;

  return (
    <div className="space-y-20  flex justify-center items-center">
      <UpdateForm note={note} />
      <ToastContainer />
    </div>
  );
}
