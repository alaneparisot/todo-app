import { Reducer } from 'redux'

import TaskState from '../types/TaskState'
import Task from '../types/Task'
import * as taskActions from '../actions/taskActions'

const initialState: TaskState = {
  tasks: [],
}

export default ((state = initialState, action): TaskState => {
  switch (action.type) {
    case taskActions.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload.task],
      }
    case taskActions.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task: Task) => task.id !== action.payload.id),
      }
    case taskActions.GET_TASKS:
      return {
        ...state,
        tasks: action.payload.tasks,
      }
    case taskActions.TOGGLE_TASK:
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
}) as Reducer<TaskState, taskActions.TaskAction>
