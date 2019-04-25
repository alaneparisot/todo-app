import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import Task from '../types/Task'
import db from '../db'

export const ADD_TASK = 'ADD_TASK'
export type ADD_TASK = typeof ADD_TASK

export const DELETE_TASK = 'DELETE_TASK'
export type DELETE_TASK = typeof DELETE_TASK

export const GET_TASKS = 'GET_TASKS'
export type GET_TASKS = typeof GET_TASKS

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

export const addTask = (description: string): ThunkAction<Promise<void>, {}, {}, AddTask> => async (
  dispatch: ThunkDispatch<{}, {}, AddTask>,
): Promise<void> => {
  const newTask = {
    description,
    isDone: false,
  }
  try {
    const docRef = await db.collection('tasks').add(newTask)
    dispatch({
      type: ADD_TASK,
      payload: {
        task: { id: docRef.id, ...newTask },
      },
    })
  } catch (error) {
    console.error('Error adding document: ', error)
  }
}

export const deleteTask = (task: Task): ThunkAction<Promise<void>, {}, {}, DeleteTask> => async (
  dispatch: ThunkDispatch<{}, {}, DeleteTask>,
): Promise<void> => {
  try {
    await db
      .collection('tasks')
      .doc(task.id)
      .delete()
    dispatch({
      type: DELETE_TASK,
      payload: {
        id: task.id,
      },
    })
  } catch (error) {
    console.error('Error removing document: ', error)
  }
}

export const getTasks = (): ThunkAction<Promise<void>, {}, {}, GetTasks> => async (
  dispatch: ThunkDispatch<{}, {}, GetTasks>,
): Promise<void> => {
  try {
    const querySnapshot = await db.collection('tasks').get()
    dispatch({
      type: GET_TASKS,
      payload: {
        tasks: querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task)),
      },
    })
  } catch (error) {
    console.error('Error getting documents: ', error)
  }
}

export const toggleTask = (task: Task): ThunkAction<Promise<void>, {}, {}, ToggleTask> => async (
  dispatch: ThunkDispatch<{}, {}, ToggleTask>,
): Promise<void> => {
  const isDone = !task.isDone
  try {
    await db
      .collection('tasks')
      .doc(task.id)
      .update({ isDone })
    dispatch({
      type: TOGGLE_TASK,
      payload: {
        id: task.id,
        isDone,
      },
    })
  } catch (error) {
    console.error('Error updating document: ', error)
  }
}
