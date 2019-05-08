import thunk, { ThunkDispatch } from 'redux-thunk'
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store'

import { addTask, deleteTask, getTasks, toggleTask } from './taskActions'
import { ADD_TASK, DELETE_TASK, GET_TASKS, TOGGLE_TASK } from '../constants/taskActionTypes'
import Task, { TaskAction } from '../types/Task'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const mockTask: Task = {
  id: 'task1',
  description: 'Visit California',
  isDone: false,
}

jest.mock('../db', () => ({
  collection: () => ({
    add: () => Promise.resolve({ id: mockTask.id }),
    doc: () => ({
      delete: () => Promise.resolve(),
      update: () => Promise.resolve(),
    }),
    get: () => Promise.resolve({ docs: { map: () => [mockTask, mockTask] } }),
  }),
}))

describe('Task action', () => {
  let store: MockStoreEnhanced<{}, ThunkDispatch<{}, {}, TaskAction>>

  beforeEach(() => {
    store = mockStore({})
  })

  test('should add task', async () => {
    await store.dispatch(addTask(mockTask.description))
    testAction(store, ADD_TASK, { task: mockTask })
  })

  test('should delete task', async () => {
    await store.dispatch(deleteTask(mockTask))
    testAction(store, DELETE_TASK, { id: mockTask.id })
  })

  test('should get tasks', async () => {
    await store.dispatch(getTasks())
    testAction(store, GET_TASKS, { tasks: [mockTask, mockTask] })
  })

  test('should toggle task', async () => {
    await store.dispatch(toggleTask(mockTask))
    testAction(store, TOGGLE_TASK, { id: mockTask.id, isDone: !mockTask.isDone })
  })
})

// Private /////////////////////////////////////////////////////////////////////////////////////////

const testAction = (
  store: MockStoreEnhanced<{}, ThunkDispatch<{}, {}, TaskAction>>,
  expectedType: string,
  expectedPayload: object,
) => {
  const actions = store.getActions()
  expect(actions.length).toBe(1)
  expect(actions[0].type).toBe(expectedType)
  expect(actions[0].payload).toEqual(expectedPayload)
}
