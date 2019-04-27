import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import Task, { AddTask, DeleteTask, GetTasks, ToggleTask } from '../types/Task'
import { ADD_TASK, DELETE_TASK, GET_TASKS, TOGGLE_TASK } from '../constants/taskActionTypes'
import db from '../db'

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
