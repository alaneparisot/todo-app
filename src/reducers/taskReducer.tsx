import { Reducer } from 'redux'

import Task, { TaskAction, TaskState } from '../types/Task'
import { ADD_TASK, DELETE_TASK, GET_TASKS, TOGGLE_TASK } from '../constants/taskActionTypes'

const initialState: TaskState = {
  tasks: [],
}

export default ((state = initialState, action): TaskState => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload.task],
      }
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task: Task) => task.id !== action.payload.id),
      }
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload.tasks,
      }
    case TOGGLE_TASK:
      return {
        ...state,
        tasks: [...state.tasks].map((task: Task) => {
          if (task.id === action.payload.id) {
            return {
              ...task,
              isDone: action.payload.isDone,
            }
          }
          return task
        }),
      }
    default:
      return state
  }
}) as Reducer<TaskState, TaskAction>
