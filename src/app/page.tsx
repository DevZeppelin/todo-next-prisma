import Link from "next/link";
import { prisma } from "./db";
import { TodoItem } from "@/components/TodoItem";

//saco esta funcion afuera para q se vea mas limpio y para poder usarla en cualqueior aprte del proyecto
function getTodos() {
  return prisma.todo.findMany();
}

//la función va a correr en el servidor
async function toggleTodo(id: string, complete: boolean){
  "use server"
  console.log(id,complete)
  await prisma.todo.update({where: {id}, data:{complete}})
  //await prisma.todo.delete({where: {id}}) to delete!
}

export default async function Home() {

  const todos = await getTodos();
  // await prisma.todo.create({ data: { title: "GINO", complete: false } }); < Crea un item

  return (
    <>
      <header className="flex justify-between items-center mb-4 ">
        <h1 className="text-2xl">ToDos</h1>
        <Link
          className="border text-xl border-slate-300 text-slate-300 hover:bg-slate-700 focus-within:bg-slate-500 outline-none p-3 rounded-md"
          href="/new"
        >
          New
        </Link>
      </header>

      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  );
}
