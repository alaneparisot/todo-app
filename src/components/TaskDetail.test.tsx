import React from 'react'
import { configure, mount, ReactWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { BrowserRouter, match as Match } from 'react-router-dom'

import TaskDetail from './TaskDetail'
import Loading from './Loading'
import Task from '../types/Task'

configure({ adapter: new Adapter() })

const mockTask: Task = {
  id: 'task1',
  description: 'Visit California',
  isDone: false,
}

jest.mock('../db', () => ({
  collection: () => ({
    doc: () => ({
      get: () =>
        Promise.resolve({
          exists: true,
          id: mockTask.id,
          data: () => ({
            description: mockTask.description,
            isDone: mockTask.isDone,
          }),
        }),
    }),
  }),
}))

describe('<TaskDetail />', () => {
  let wrapper: ReactWrapper

  const match = { params: { id: mockTask.id } } as Match<{ id: string }>

  beforeEach(() => {
    // Wrapped between <BrowserRouter></BrowserRouter> to avoid error:
    // Invariant failed: You should not use <Link> outside a <Router>
    wrapper = mount(
      <BrowserRouter>
        <TaskDetail match={match} />,
      </BrowserRouter>,
    )
  })

  test('should render a h2 and a Link, but no task information', () => {
    expect(wrapper.exists('h2')).toBeTruthy()
    expect(wrapper.exists(Loading)).toBeTruthy()
    expect(wrapper.find('Link').prop('to')).toBe(`/tasks`)
  })

  test('should render task information', async () => {
    await wrapper.update()
    expect(wrapper.contains(mockTask.description)).toBeTruthy()
    expect(wrapper.contains('Not yet 😁')).toBeTruthy()
  })
})
