"use client";

import Link from "next/link";

export function Breadcrumb({ path }: { path: string }) {
  const paths = path.split(path).join("/");
  return (<nav>
        
        <Link href={'/'}>Home</Link>
        <Link href={'/note/${id}'}>Update Note</Link>

  </nav>);
}
