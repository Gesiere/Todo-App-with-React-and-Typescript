


import { useTodoGlobalContext } from "../TodosContext"



const Footer = () => {
    const {state} = useTodoGlobalContext()
    const itemsLength = state.allTodos.filter(t => t.isCompleted === false).length
    const {dispatch, reducerAction} = useTodoGlobalContext()
    
  return (
    <footer className="shadow-2x mb-12 dark:bg-veryDarkDesaturatedBlue">
      <div className=" dark:bg-veryDarkDesaturatedBlue shadow-2xl p-4 bg-white flex items-center justify-between">
        <div className="">
          <span className="text-darkGrayishBlue  dark:text-darkGrayishBlue">
            {itemsLength} items left
          </span>
        </div>
        <div className="flex gap-2 max-[991px]:hidden">
          <button
            className={
              state.showAllTodos
                ? 'text-brightBlue'
                : ' text-darkGrayishBlue hover:text-veryDarkGrayishBlue dark:hover:text-lightGrayishBlueHover dark:text-darkGrayishBlue'
            }
            onClick={() => dispatch({ type: reducerAction.ALL_FILTER })}
          >
            All
          </button>
          <button
            className={
              state.showActiveTodos
                ? 'text-brightBlue'
                : ' hover:text-veryDarkGrayishBlue dark:hover:text-lightGrayishBlueHover text-darkGrayishBlue dark:text-darkGrayishBlue'
            }
            onClick={() =>
              dispatch({
                type: reducerAction.ACTIVE_FILTER,
              })
            }
          >
            Active
          </button>
          <button
            className={
              state.showCompletedTodos
                ? 'text-brightBlue'
                : 'hover:text-veryDarkGrayishBlue dark:hover:text-lightGrayishBlueHover dark:text-darkGrayishBlue'
            }
            onClick={() => dispatch({ type: reducerAction.COMPLETED_FILTER })}
          >
            Completed
          </button>
        </div>
        <div className="dark:text-darkGrayishBlue">
          <button className="cursor-pointer"
            onClick={() => dispatch({ type: reducerAction.CLEAR_COMPLETED })}
          >
            Clear Completed
          </button>
        </div>
      </div>
      <div className="dark:bg-veryDarkDesaturatedBlue mt-4 py-2 px-4 min-[991px]:hidden bg-white flex justify-center items-center gap-4 shadow-lg md:hidden">
        <button
          className={
            state.showAllTodos
              ? 'text-brightBlue'
              : 'text-darkGrayishBlue dark:text-darkGrayishBlue hover:text-veryDarkGrayishBlue dark:hover:text-lightGrayishBlueHover'
          }
          onClick={() => dispatch({ type: reducerAction.ALL_FILTER })}
        >
          All
        </button>
        <button
          className={
            state.showActiveTodos
              ? 'text-brightBlue'
              : 'text-darkGrayishBlue dark:text-darkGrayishBlue hover:text-veryDarkGrayishBlue dark:hover:text-lightGrayishBlueHover'
          }
          onClick={() =>
            dispatch({
              type: reducerAction.ACTIVE_FILTER,
            })
          }
        >
          Active
        </button>
        <button
          className={
            state.showCompletedTodos
              ? 'text-brightBlue'
              : 'text-darkGrayishBlue dark:text-darkGrayishBlue hover:text-veryDarkGrayishBlue dark:hover:text-lightGrayishBlueHover'
          }
          onClick={() => dispatch({ type: reducerAction.COMPLETED_FILTER })}
        >
          Completed
        </button>
      </div>
    </footer>
  )
}

export default Footer