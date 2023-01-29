import React, { useRef } from 'react';
import './style.css'

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    HandleAdd: (e: React.FormEvent) => void;
}

const InputField = ({todo, setTodo, HandleAdd}:Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <form className = "input" onSubmit={(e) => {
      HandleAdd(e);
      inputRef.current?.blur()
    }}>
        <input 
            ref = {inputRef}
            type = "input" 
            placeholder = 'Entera task!' 
            className = 'input__box' 
            onChange = {(event) => setTodo(event.target.value)}
            value =  {todo}/>
        <button className = "input_submit" type = 'submit'>Go!</button>
    </form>
  )
}

export default InputField
