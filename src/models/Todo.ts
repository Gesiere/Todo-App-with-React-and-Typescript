export type Todo = {
    todo: string
    id: number,
    isCompleted: boolean
}

export interface initState {
    todos : Todo[] ,
    addTodo : () => void
}

export enum REDUCER_ACTION {
    ADD_TODO,
    SET_COMPLETED,
    REMOVE_TODO,
    ALL_FILTER,
    ACTIVE_FILTER,
    COMPLETED_FILTER,
    CLEAR_COMPLETED,
    DRAG_N_DROP
}

