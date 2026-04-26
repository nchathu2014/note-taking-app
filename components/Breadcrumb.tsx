"use client";
export function Breadcrumb({ path }: { path: string }) {
  const paths = path.split(path).join("/");
  return <nav>{paths}</nav>;
}
