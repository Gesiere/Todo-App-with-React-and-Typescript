import { FormEvent, useState } from "react"
import { Todo } from "../models/Todo"
import { useTodoGlobalContext } from "../TodosContext"


const Input = () => {
  const {addTodo} = useTodoGlobalContext()
  const [todo, setTodo] = useState<string>('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const newTodo : Todo = {
      todo: todo,
      isCompleted: false,
      id: performance.now()
    }
    addTodo(newTodo)
    setTodo('')
  }
  return (
    <form
      className=" dark:bg-veryDarkDesaturatedBlue flex shadow-2xl items-center gap-8 px-6 py-4 mt-8 mb-6 rounded bg-white"
      onSubmit={(e) => handleSubmit(e)}
    >
      <button className="border-2 dark:border-veryDarkGrayishBlue border-[#e4e5f1] rounded-[50%] h-6 aspect-square border-solid"></button>
      <input
        className="dark:bg-veryDarkDesaturatedBlue w-full dark:text-lightGrayishBlue"
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Create a new todo..."
      />
    </form>
  )
}

export default Input