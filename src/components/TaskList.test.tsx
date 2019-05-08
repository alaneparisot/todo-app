import React from 'react'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import TaskList from './TaskList'
import Loading from './Loading'
import Task from '../types/Task'

configure({ adapter: new Adapter() })

describe('<TaskList />', () => {
  let wrapper: ShallowWrapper

  const mockTask1: Task = { id: 'task1', description: 'Visit California', isDone: false }
  const mockTask2: Task = { id: 'task2', description: 'Learn React', isDone: true }
  const mockTask3: Task = { id: 'task3', description: 'Ride a big wave', isDone: false }
  const mockTasks: Task[] = [mockTask1, mockTask2, mockTask3]
  const onTaskStatusChange = jest.fn()
  const onTaskDelete = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <TaskList tasks={[]} isLoading={true} onTaskStatusChange={onTaskStatusChange} onTaskDelete={onTaskDelete} />,
    )
  })

  test('should render Loading component', () => {
    expect(wrapper.exists(Loading)).toBeTruthy()
  })

  test('should render message when tasks array is empty', () => {
    wrapper.setProps({ isLoading: false })
    expect(wrapper.exists('.no-tasks')).toBeTruthy()
  })

  test('should render children in task list', () => {
    wrapper.setProps({ tasks: mockTasks, isLoading: false })
    expect(wrapper.find('ul').children().length).toBe(3)
  })
})
