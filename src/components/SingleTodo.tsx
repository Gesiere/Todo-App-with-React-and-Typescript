import { Todo } from "../models/Todo";
import checkIcon from '../assets/images/icon-check.svg'
import { useTodoGlobalContext } from "../TodosContext";
import crossIcon from '../assets/images/icon-cross.svg'
import { Draggable} from "react-beautiful-dnd"

import { useRef } from "react";

type propTypes = {
  prop: Todo,
  index: number
}

const SingleTodo = ({prop, index}: propTypes) => {
    const {todo, isCompleted, id} = prop
    const {setCompleted, removeTodo} = useTodoGlobalContext()
    const todoClass = 'group cursor-pointer flex items-center py-4 px-6 justify-between border-b-[1px] border-[#d2d3db] dark:border-veryDarkGrayishBlue2 border-solid'
    const completedTodo = `text-veryLightGrayishBlue dark:text-veryDarkGrayishBlue line-through ${todoClass}`
    const completedButton = `rounded-[50%] h-6 aspect-square bg-gradient-to-r from-[#57ddff] to-[#c058f3]`
    const todoRef = useRef<HTMLLIElement>(null) 
 
    
 

  return (
    <Draggable key={id} index={index} draggableId={id.toString()}>
        {(provided) => (
            <div
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            >
              <ul>

                <li className={isCompleted ? completedTodo : todoClass}
                draggable
                ref={todoRef}
                
                >
                  <div className="flex gap-4">
                    <button
                      onClick={() => setCompleted(prop)}
                      className={
                        isCompleted
                          ? completedButton
                          : 'border-2 border-solid dark:hover:border-lightGrayishBlueHover dark:border-veryDarkGrayishBlue border-[#e4e5f1]  rounded-[50%] h-6 aspect-square border-solid'
                      }
                    >
                      {isCompleted && (
                        <img src={checkIcon} className="m-auto" alt="A Check icon" />
                      )}
                    </button>
                    <p
                      className={
                        isCompleted
                          ? 'dark:text-veryDarkGrayishBlue'
                          : ` dark:text-lightGrayishBlue text-veryDarkGrayishBlue md:text-lg`
                      }
                    >
                      {todo}
                    </p>
                  </div>
                  <button
                    className="hidden group-hover:block"
                    onClick={() => removeTodo(prop)}
                  >
                    <img src={crossIcon} alt="A cross Icon" />
                  </button>
                </li>
              </ul>
            </div>

        )}
    </Draggable>
  )
}

export default SingleTodo