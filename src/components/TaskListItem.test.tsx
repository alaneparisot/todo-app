import React from 'react'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import TaskListItem from './TaskListItem'
import Task from '../types/Task'

configure({ adapter: new Adapter() })

describe('<TaskListItem />', () => {
  let wrapper: ShallowWrapper

  const mockTask: Task = { id: 'task1', description: 'Visit California', isDone: false }
  const mockOnTaskStatusChange = jest.fn()
  const mockOnTaskDelete = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <TaskListItem task={mockTask} onTaskStatusChange={mockOnTaskStatusChange} onTaskDelete={mockOnTaskDelete} />,
    )
  })

  test('should render a Link and a checkbox, but no button', () => {
    expect(wrapper.find('Link').prop('to')).toBe(`/tasks/${mockTask.id}`)
    expect(
      wrapper
        .find('Link')
        .childAt(0)
        .text(),
    ).toBe(mockTask.description)
    expect(wrapper.find('input[type="checkbox"]').prop('checked')).toBe(false)
    expect(wrapper.exists('button')).toBeFalsy()
  })

  test('should render a button when task is done', () => {
    wrapper.setProps({ task: { isDone: true } })
    expect(wrapper.exists('button')).toBeTruthy()
  })

  test('should call onTaskStatusChange on input change', () => {
    wrapper.find('input').simulate('change')
    testCall(mockOnTaskStatusChange, mockTask)
  })

  test('should call onTaskDelete on button click', () => {
    const mockDoneTask = { ...mockTask, isDone: true }
    wrapper.setProps({ task: mockDoneTask })
    wrapper.find('button').simulate('click')
    testCall(mockOnTaskDelete, mockDoneTask)
  })
})

// Private /////////////////////////////////////////////////////////////////////////////////////////

const testCall = (fnCalled: jest.Mock, fnCalledWith: any) => {
  expect(fnCalled.mock.calls.length).toBe(1)
  expect(fnCalled.mock.calls[0][0]).toBe(fnCalledWith)
}
