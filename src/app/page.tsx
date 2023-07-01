"use client"
import { useEffect, useState } from 'react';

import supabase from "../../supabase"

export default function Home() {
  const [todos, setTodos] = useState<todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const fetchTodos = async () => {
    const { data, error } = await supabase.from('Todos_table').select('*')
    if (error) {
      console.error('Error fetching todos:', error);
    } else {
      setTodos(data)
      console.log(data)
    }
  };

  const addTodo = async () => {
    if (newTodo.trim() !== '') {
      const { data, error } = await supabase
        .from('Todos_table')
        .insert([{ description: newTodo.trim() }]);
      if (error) {
        console.error('Error adding todo:', error);
      } else {
        setNewTodo('');
        fetchTodos();
      }
    }
  };

  const deleteTodo = async (id: number) => {
    const { error } = await supabase.from('Todos_table').delete().eq('id', id);
    if (error) {
      console.error('Error deleting todo:', error);
    } else {
      fetchTodos();
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Supabase Todo App</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo: any) => (
          <li key={todo.id}>
           <>
            <h1>
               {todo.title}
            </h1>
            <p>
              {todo.descrition}
            </p>
           </>
          </li>
        ))}
      </ul>
    </div>
  );
}
