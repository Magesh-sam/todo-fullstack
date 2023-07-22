/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useState, FormEvent, useEffect } from "react";
import { auth, db } from "../firebase/config";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";import Navbar from "./Navbar";

type Todo = {
  taskName: string;
  isCompleted: boolean;
  id: string;
  uid: string;
};

const Todo = () => {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/todo");
      } else {
        navigate("/");
      }
    });
  },[])

  const [taskName, setTaskName] = useState("");
  const [todoList, setTodoList] = useState<Todo[]>([]);

  
  const todoRef = collection(db, "todos");
  
  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getDocs(query(todoRef, where("uid", "==", auth?.currentUser?.uid)));
      const todos = data.docs.map((doc) => (
        {
          taskName: doc.data().taskName as string,
          isCompleted: doc.data().isCompleted as boolean,
          id: doc.id,
          uid: doc.data().uid as string
        }
      ))
      setTodoList(todos)
    }
    
    
fetchTodos();
  },[])
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setTaskName(e.currentTarget.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addDoc(todoRef, {
        taskName,
        isCompleted: false,
        uid: auth?.currentUser?.uid,
      });

      setTaskName("");
      
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };


  

  return (
    <main className="flex flex-col items-center h-screen gap-3">
      <Navbar  />
     
      <h1 className="text-4xl font-bold">{ auth?.currentUser?.displayName}Todo-list</h1>
      <form className="space-x-4" onSubmit={(e)=>handleSubmit(e)}>
        <input
          type="text"
          placeholder="add task"
          value={taskName}
          onChange={handleChange}
          className="form-input border-2 outline border-black focus:outline-dashed outline-2 focus:border-none"
          required
          autoFocus
        />
        <button
          type="submit"
          className="bg-[#C5A1FF] shadow-neo border-2 border-black text-black hover:shadow-none transition-shadow duration-200 ease-in font-bold py-2 px-4 rounded disabled:cursor-not-allowed"
        >
          add
        </button>
      </form>
      <ul className="space-y-5">
        {todoList.map((todo) => (
          <li  key={todo.id} className="flex gap-5" >
            <div className="bg-[#C5A1FF] shadow-neo border-2 border-black flex max-w-md min-w-[250px] p-2 justify-between" >
              <p className="text-black font-bold">{todo.taskName}</p>
              {/* <input type="checkbox" name="todostatus" id="todostatus" checked={todo.isCompleted} onChange={()=>handleTodoStatus(todo.id, todo.isCompleted)} className="accent-[#C5A1FF] outline w-5 h-5" /> */}
            </div>
            <button className="p-2 bg-[#FF7A5C] font-bold shadow-neo border-2 border-black text-black hover:shadow-none transition-shadow duration-200 ease-in">Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Todo;