import { Reducer } from 'redux'
import produce from 'immer'

import Task, { TaskAction, TaskState } from '../types/Task'
import { ADD_TASK, DELETE_TASK, GET_TASKS, TOGGLE_TASK } from '../constants/taskActionTypes'

const initialState: TaskState = {
  tasks: [],
}

export default ((baseState = initialState, action): TaskState => {
  switch (action.type) {
    case ADD_TASK:
      return produce(baseState, draftState => {
        draftState.tasks.push(action.payload.task)
      })
    case DELETE_TASK:
      return produce(baseState, draftState => {
        const i = getTaskIndexById(draftState.tasks, action.payload.id)
        draftState.tasks.splice(i, 1)
      })
    case GET_TASKS:
      return produce(baseState, draftState => {
        draftState.tasks = action.payload.tasks
      })
    case TOGGLE_TASK:
      return produce(baseState, draftState => {
        const i = getTaskIndexById(draftState.tasks, action.payload.id)
        draftState.tasks[i].isDone = !draftState.tasks[i].isDone
      })
    default:
      return baseState
  }
}) as Reducer<TaskState, TaskAction>

// Private /////////////////////////////////////////////////////////////////////////////////////////

const getTaskIndexById = (tasks: Task[], id: string) => tasks.findIndex(task => task.id === id)
