import React, {useEffect, useRef, useState} from 'react'
import Todo from './model'
import  { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import './style.css'


type Props = {
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
}

const SingleTodo = ({todo, todos, setTodos}:Props) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo)

  const HandleDone = (id: number) => {
    setTodos(todos.map((todo) => todo.id === id ?{...todo, idDone: !todo.isDone} :todo ))
  }

const HandleDelete = (id: number) => {
  setTodos(todos.filter((todo) => todo.id !== id))
}

const HandleEdit = (e: React.FormEvent, id: number) => {
  e.preventDefault()

  setTodos(todos.map((todo) => (
    todo.id === id ? {...todo, todo: editTodo}:todo
  )))
  setEdit(false)
}

const inputRef = useRef<HTMLInputElement>(null)

useEffect(() => {
  inputRef.current?.focus()
}, [edit])


  return (
    <form className="todos__single" onSubmit={(e) => HandleEdit(e, todo.id)}> 
      {
        edit ? (
          <input
            ref={inputRef}
            placeholder='enter changes!' 
            value={editTodo} onChange={(e) => setEditTodo(e.target.value)} 
            className='todos__single--text'>
          </input>
        ) : (
          todo.isDone ?(
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
              <span className="todos__single--text">{todo.todo}</span>
            )
        )
      }

        <div>
          <span className="icon" onClick={ () => {
            if (!edit && !todo.isDone) {
              setEdit(!edit)
            }
          }
          }>
            <AiFillEdit></AiFillEdit>
          </span>
          <span className="icon" onClick={() => HandleDelete(todo.id)}>
            <AiFillDelete></AiFillDelete>
          </span>
          <span className="icon" onClick={() => HandleDone(todo.id)}>
            <MdDone></MdDone>
          </span>
        </div>
    </form>
  )
}

export default SingleTodo
