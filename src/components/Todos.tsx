
import { useTodoGlobalContext } from "../TodosContext"
import Footer from "./Footer"
import SingleTodo from "./SingleTodo"
import { DragDropContext, Droppable, OnDragEndResponder } from "react-beautiful-dnd"




const Todos = () => {
    const {state, dispatch, reducerAction} = useTodoGlobalContext();
    const handleOnDragEnd = (result : any) => {
        dispatch({type: reducerAction.DRAG_N_DROP, payload: result})
        
    }
    

    
    
    
  return (
    <>
      <div className="mt-8 bg-white transition ease-in-out duration-400 dark:bg-veryDarkDesaturatedBlue rounded shadow-2xl">
        <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="todos">
                {(provided) => (
                  <div 
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  >
                    {state.showAllTodos &&
                      state.allTodos.map((todo, index) => (
                        <SingleTodo prop={todo} index={index} key={todo.id} />
                      ))}
                  
      
                      {state.showActiveTodos &&
                        state.activeTodos.map((todo, index) => (
                          <SingleTodo prop={todo} index={index} key={todo.id} />
                        ))}
                      {state.showCompletedTodos &&
                        state.completedTodos.map((todo, index) => (
                          <SingleTodo prop={todo} index={index} key={todo.id} />
                        ))}

                  </div>
                )}
            </Droppable>

        </DragDropContext>

      </div>
      <Footer />
      <p className="text-center mb-10 text-darkGrayishBlue">
        Drag and Drop to reorder list
      </p>
    </>
  )
}

export default Todos