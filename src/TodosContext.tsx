import { createContext, ReactElement, useContext, useEffect, useMemo, useReducer } from "react";
import { REDUCER_ACTION, Todo,  } from "./models/Todo";
import { todos } from "./data";


type childrenType = {
    children: ReactElement
}


const activeTodos = todos.filter(todo => !todo.isCompleted)
const completedTodos = todos.filter(todo => todo.isCompleted)
type stateType = {
    allTodos: Todo[],
    activeTodos: Todo[],
    completedTodos: Todo[],
    showAllTodos: boolean,
    showActiveTodos: boolean,
    showCompletedTodos: boolean
}


const defaultState : stateType  = {
    allTodos: todos,
    activeTodos,
    completedTodos,
    showAllTodos : true,
    showActiveTodos: false,
    showCompletedTodos: false
}


const initializer = (initialValue = defaultState) => {
    const localData = localStorage.getItem('todos')
    if(localData){
        return JSON.parse(localData)
    }else {
        return initialValue
    }
    
}




export type ReducerAction = | {
    type: REDUCER_ACTION.ADD_TODO,
    payload: Todo,
} | 

{
    type: REDUCER_ACTION.REMOVE_TODO,
    payload: Todo
} |
{
    type: REDUCER_ACTION.SET_COMPLETED,
    payload: Todo
}
| {
    type: REDUCER_ACTION.ALL_FILTER,
    

} | {
    type: REDUCER_ACTION.COMPLETED_FILTER
    
} | {
    type: REDUCER_ACTION.ACTIVE_FILTER
} | {
    type: REDUCER_ACTION.CLEAR_COMPLETED
    
} | {
    type: REDUCER_ACTION.DRAG_N_DROP,
    payload: any
    
}



const reducer = (state: stateType , action: ReducerAction)  => {
    
    switch(action.type) {
        case REDUCER_ACTION.ADD_TODO:
            // state.activeTodos = state.allTodos
            return  {...state,activeTodos:[...state.activeTodos, action.payload],  allTodos: [...state.allTodos, action.payload]}
        
        case REDUCER_ACTION.SET_COMPLETED:
            const {id, isCompleted} = action.payload
            const setAllTodos = state.allTodos.map(todo => todo.id === id ? {...todo, isCompleted: !isCompleted} : todo)
            const setActiveTodos = state.activeTodos.map(todo => todo.id === id ? {...todo, isCompleted: !isCompleted} : todo).filter(todo => todo.id != id)
            const setCompletedTodos = state.completedTodos.map(todo => todo.id === id ? {...todo, isCompleted: !isCompleted} : todo).filter(todo => todo.id != id)

             
            return {...state,allTodos:[...setAllTodos], completedTodos: [...setCompletedTodos], activeTodos: [...setActiveTodos]}

        case REDUCER_ACTION.REMOVE_TODO: {
            const {id} = action.payload
            const newAllTodos = state.allTodos.filter(todo => todo.id !== id)
            const newActiveTodos = state.activeTodos.filter(todo => todo.id !== id)
            const newCompletedTodos = state.completedTodos.filter(todo => todo.id !== id)
            return {...state, allTodos:[...newAllTodos], activeTodos: newActiveTodos, completedTodos: [...newCompletedTodos]}
        }
        case REDUCER_ACTION.ALL_FILTER: {
            const filteredTodo = state.allTodos.map(todo => todo)
            state.showAllTodos = true
            state.showCompletedTodos = false
            state.showActiveTodos = false
            
            return {...state, allTodos:[...filteredTodo]}
        }
        case REDUCER_ACTION.ACTIVE_FILTER: {
            const filteredTodo = state.allTodos.filter(todo => !todo.isCompleted)
            state.showAllTodos = false
            state.showCompletedTodos = false
            state.showActiveTodos = true
            return {...state, activeTodos:[...filteredTodo]}
        }
        case REDUCER_ACTION.COMPLETED_FILTER:{
            const newState = state.allTodos.filter(todo => todo.isCompleted)
            state.showAllTodos = false
            state.showCompletedTodos = true
            state.showActiveTodos = false

            return {...state, completedTodos: [...newState]}
        }
        case REDUCER_ACTION.CLEAR_COMPLETED: {
            state.completedTodos = []
            const newState = state.allTodos.filter(todo => !todo.isCompleted)
            return {...state, allTodos:[...newState]}
        }
        case REDUCER_ACTION.DRAG_N_DROP: {
            const result = action.payload
            let allTodoItems = [...state.allTodos]
            let activeTodoItems = [...state.activeTodos]
            let completedTodoItems = [...state.completedTodos]

            const [allReorderedItem] = allTodoItems.splice(result.source.index, 1)
            const [activeReorderedItem] = activeTodoItems.splice(result.source.index, 1)
            const [completedReorderedItem] = completedTodoItems.splice(result.source.index, 1)
            allTodoItems.splice(result.destination.index, 0, allReorderedItem)
            activeTodoItems.splice(result.destination.index, 0, activeReorderedItem)
            completedTodoItems.splice(result.destination.index, 0, completedReorderedItem)

            return {...state, allTodos: [...allTodoItems], activeTodos: activeTodoItems, completedTodos: completedTodoItems}
        }

        
        default:
            return state
            
    }
}

const useTodoContext = () => {
    const [state, dispatch] = useReducer(reducer, initializer());

    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(state))
    }, [state])
    

    const reducerAction = useMemo(() =>{
        return REDUCER_ACTION
    },[])
    const addTodo = (value : Todo) => {
        dispatch({type: REDUCER_ACTION.ADD_TODO,payload: value})
    }
    const setCompleted = (value : Todo) => {
        dispatch({type: REDUCER_ACTION.SET_COMPLETED, payload: value})
    }
    const removeTodo = (value:Todo)=> {
        dispatch({type: REDUCER_ACTION.REMOVE_TODO, payload:value})
    }
    

    
    return {reducerAction,dispatch, state, addTodo, setCompleted, removeTodo}
    
}

type TodoContextType = ReturnType<typeof useTodoContext>

const initStateContext: TodoContextType = {
    
    reducerAction: REDUCER_ACTION,
    dispatch: () => {},
    state: defaultState,
    addTodo: () => {},
    setCompleted: () => {},
    removeTodo: () => {},
}



const AppContext = createContext<TodoContextType>(initStateContext);

export const AppProvider = ({children} : childrenType) => {
    return <AppContext.Provider
    value={
        useTodoContext()
    }
    >
        {children}
    </AppContext.Provider>
}

export const useTodoGlobalContext = () => {
    const context = useContext(AppContext)
    return context
}