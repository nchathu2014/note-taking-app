export type Note = {
  _id?:string;
  title: string;
  content: string;
  updateAt: Date;
  createdAt: Date;
};

export type NotesType = {
  notes: Note[];
  total: number;
} | null;

export enum API_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}
