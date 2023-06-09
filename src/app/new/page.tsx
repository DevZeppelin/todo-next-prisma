import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "../db";

async function createTodo(data: FormData) {
  "use server"; //esta funcion correra en el server y nunca en el cliente

  const title = data.get("title")?.valueOf();

  if (typeof title != "string" || title.length === 0) {
    throw new Error("Título inválido");
  }
  await prisma.todo.create({ data: { title, complete: false } });
  console.log("HI");
  redirect("/");
}

export default function Page() {
  return (
    <>
      <header className="flex justify-between items-center mb-4 ">
        <h1 className="text-2xl">New</h1>
      </header>
      <form action={createTodo} className="flex gap-2 flex-col">
        <input
          type="text"
          name="title"
          className="border text-xl border-slate-300 bg-transparent rounded-md px-2 py-1 outline-none focus-within:border-slate-100"
        />
        <div className="flex gap-1 justify-end">
          <Link
            href=".."
            className="border text-xl border-slate-300 text-slate-300 hover:bg-slate-700 focus-within:bg-slate-500 outline-none p-3 rounded-md"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="border text-xl border-slate-300 text-slate-300 hover:bg-slate-700 focus-within:bg-slate-500 outline-none p-3 rounded-md"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}
