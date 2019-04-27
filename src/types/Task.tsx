import * as taskActionTypes from '../constants/taskActionTypes'

// Type

export default interface Task {
  readonly id: string
  description: string
  isDone: boolean
}

// State

export interface TaskState {
  tasks: Task[]
}

// Actions

type ADD_TASK = typeof taskActionTypes.ADD_TASK
type DELETE_TASK = typeof taskActionTypes.DELETE_TASK
type GET_TASKS = typeof taskActionTypes.GET_TASKS
type TOGGLE_TASK = typeof taskActionTypes.TOGGLE_TASK

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

export interface GetTasks {
  type: GET_TASKS
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

export type TaskAction = AddTask | DeleteTask | GetTasks | ToggleTask
