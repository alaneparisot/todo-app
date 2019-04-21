import Task from '../types/Task'

export const ADD_TASK = 'ADD_TASK'
export type ADD_TASK = typeof ADD_TASK

export const DELETE_TASK = 'DELETE_TASK'
export type DELETE_TASK = typeof DELETE_TASK

export const SET_TASKS = 'SET_TASKS'
export type SET_TASKS = typeof SET_TASKS

export const TOGGLE_TASK = 'TOGGLE_TASK'
export type TOGGLE_TASK = typeof TOGGLE_TASK

export interface AddTask {
  type: ADD_TASK
  payload: {
    task: Task
  }
}

export interface DeleteTask {
  type: DELETE_TASK
  payload: {
    id: string
  }
}

export interface SetTasks {
  type: SET_TASKS
  payload: {
    tasks: Task[]
  }
}

export interface ToggleTask {
  type: TOGGLE_TASK
  payload: {
    id: string
    isDone: boolean
  }
}

export type TaskAction = AddTask | DeleteTask | SetTasks | ToggleTask

export const addTask = (task: Task): AddTask => ({
  type: ADD_TASK,
  payload: {
    task,
  },
})

export const deleteTask = (id: string): DeleteTask => ({
  type: DELETE_TASK,
  payload: {
    id,
  },
})

export const setTasks = (tasks: Task[]): SetTasks => ({
  type: SET_TASKS,
  payload: {
    tasks,
  },
})

export const toggleTask = (id: string, isDone: boolean): ToggleTask => ({
  type: TOGGLE_TASK,
  payload: {
    id,
    isDone,
  },
})
