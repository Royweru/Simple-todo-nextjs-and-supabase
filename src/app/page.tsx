"use client";
import { useEffect, useState } from "react";

import supabase from "../../supabase";

export default function Home() {
  const [todos, setTodos] = useState<todo[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newBoby, setNewBody] = useState("");

  const fetchTodos = async () => {
    const { data, error } = await supabase.from("Todos_table").select("*");
    if (error) {
      console.error("Error fetching todos:", error);
    } else {
      setTodos(data);
    }
  };

  const addTodo = async () => {
    if (newTitle.trim() !== "" && newBoby !== "" ) {
      const { data, error } = await supabase
        .from("Todos_table")
        .insert([{ title: newTitle.trim(),description: newBoby }]);
      if (error) {
        console.error("Error adding todo:", error);
      } else {
        setNewTitle("");
        setNewBody("")
        fetchTodos();
      }
    }
  };

  const deleteTodo = async (id: number) => {
    const { error } = await supabase.from("Todos_table").delete().eq("id", id);
    if (error) {
      console.error("Error deleting todo:", error);
    } else {
      fetchTodos();
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="w-100 flex flex-col justify-center place-items-center">
      <h1 className=" font-bold font-mono text-5xl py-6">YOUR TODO APP ❤️❤️</h1>
      <div className=" py-4 h-auto ">
        <h1 className=" text-xl text-orange-700 font-semibold"> Title:</h1>
        <input
          className=" text-red-300 font-bold font-mono px-8 py-5 rounded-md border-4 border-red-200"
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <h1 className=" text-xl text-orange-700 font-semibold">What you want to do:</h1>
         <input
          className=" text-red-300 font-bold font-mono px-8 py-5 rounded-md border-4 border-red-200"
          type="text"
          value={newBoby}
          onChange={(e) => setNewBody(e.target.value)}
        />
        <button
          onClick={addTodo}
          className=" ml-3 border-double p-4 bg-gray-800 text-yellow-800 font-serif font-bold rounded-lg hover:bg-white"
        >
          Add Todo
        </button>
      </div>
      <ul className=" w-100 bg-slate-300">
        {todos.map((todo: any) => (
          <li key={todo.id}>
           <article className=" bg-gray-400 p-7 rounded-lg m-2">
            <h2 className=" text-xl text-black font-mono">
              {todo.title}
            </h2>
            <p className=" text-xl">
              {todo.description}
            </p>
            <button onClick={()=>deleteTodo(todo.id)} className=" border-none p-5 rounded-2xl bg-zinc-500 mt-2 mb-2" >
              DELETE
            </button>
           </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
