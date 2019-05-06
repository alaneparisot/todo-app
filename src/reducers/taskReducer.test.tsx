import taskReducer from './taskReducer'
import { ADD_TASK, DELETE_TASK, GET_TASKS, TOGGLE_TASK } from '../constants/taskActionTypes'
import Task, { TaskAction, AddTask, DeleteTask, GetTasks, ToggleTask } from '../types/Task'

describe('Task reducer', () => {
  test('should return initial state when action type is unknown', () => {
    const action = { type: 'DO_SOMETHING' }
    const initialState = { tasks: [] }
    expect(taskReducer(undefined, action as TaskAction)).toEqual(initialState)
  })

  test('should add task', () => {
    const [task1] = buildTasks()
    const action: AddTask = { type: ADD_TASK, payload: { task: task1 } }
    const expectedState = { tasks: [task1] }
    const computedState = taskReducer(undefined, action)
    expect(computedState).toEqual(expectedState)
    expect(computedState.tasks[0]).not.toBe(task1)
  })

  test('should delete task', () => {
    const [task1, task2, task3] = buildTasks()
    const action: DeleteTask = { type: DELETE_TASK, payload: { id: task2.id } }
    const initialState = { tasks: [task1, task2, task3] }
    const expectedState = { tasks: [task1, task3] }
    expect(taskReducer(initialState, action)).toEqual(expectedState)
  })

  test('should get tasks', () => {
    const tasks = buildTasks()
    const action: GetTasks = { type: GET_TASKS, payload: { tasks } }
    const expectedState = { tasks }
    expect(taskReducer(undefined, action)).toEqual(expectedState)
  })

  test('should toggle task', () => {
    const [task1, task2, task3] = buildTasks()
    const action: ToggleTask = { type: TOGGLE_TASK, payload: { id: task3.id, isDone: !task3.isDone } }
    const initialState = { tasks: [task1, task2, task3] }
    const newTask3 = { ...task3, isDone: !task3.isDone }
    const expectedState = { tasks: [task1, task2, newTask3] }
    expect(taskReducer(initialState, action)).toEqual(expectedState)
  })
})

// Private /////////////////////////////////////////////////////////////////////////////////////////

const buildTasks = (): Task[] => [
  { id: 'task1', description: 'Visit California', isDone: false },
  { id: 'task2', description: 'Learn React', isDone: true },
  { id: 'task3', description: 'Ride a big wave', isDone: false },
]
