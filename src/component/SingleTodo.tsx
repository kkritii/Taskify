import React, { useState } from "react";
import { Todo } from "./model";
import { MdModeEdit, MdDone, MdDelete } from "react-icons/md";
import TodoList from "./TodoList";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ todo, todos, setTodos }: Props) => {

    const[edit,setEdit]=useState<boolean>(false);
    const [editTodo,setEditTodo] = useState<string>(todo.todo);
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit =(e: React.FormEvent,id:number)=>{
    e.preventDefault();
    setTodos(todos.map((todo)=>(
        todo.id === id ? {...todo,todo:editTodo}: todo)
        ));
        setEdit(false);
  }

  return (
    <form className="todo-single" onSubmit={(e)=> handleEdit(e,todo.id)}>
        {
            edit?(<input value={editTodo} onChange={(e)=>{
                setEditTodo(e.target.value)
            }}/>):
            todo.isDone ? (
        <s className="todo-singe-text">{todo.todo}</s>
      ) : (
        <span className="todo-singe-text">{todo.todo}</span>
      )}
      <div>
        <span className="icon" onClick={()=> 
        {if(!edit && !todo.isDone){
            setEdit(!edit)}}}>
          <MdModeEdit />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <MdDelete />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
