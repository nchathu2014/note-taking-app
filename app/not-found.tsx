import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Not Found',
    description:'Page not found'
}

export default function NoteFoundPage() {
  return (
    <div className="flex flex-col justify-center item-center h-screen text-center">
      <h1 className="text-4xl"><span className="text-red-500">404</span> Not Found</h1>
      <p className="text-lg">Note you are searching is not with us. Please call to the help desk</p>
    <Link href={'/'} className="underline mt-8">Back Home</Link>
    </div>
  );
}
