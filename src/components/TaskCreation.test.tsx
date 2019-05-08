import React from 'react'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import TaskCreation from './TaskCreation'

configure({ adapter: new Adapter() })

describe('<TaskCreation />', () => {
  let wrapper: ShallowWrapper

  const mockOnTaskCreate = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<TaskCreation onTaskCreate={mockOnTaskCreate} />)
  })

  test('should render a h2, a form, and a Link', () => {
    expect(wrapper.exists('h2')).toBeTruthy()
    expect(wrapper.exists('form')).toBeTruthy()
    expect(wrapper.find('form input[type="text"]')).toBeTruthy()
    expect(wrapper.find('input[type="text"]').prop('value')).toBe('')
    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(false)
    expect(wrapper.find('Link').prop('to')).toBe(`/tasks`)
  })

  test('should call onTaskCreate when form is submitted', () => {
    const taskDescription = 'Ride a big wave'
    const changeEvent = { currentTarget: { value: taskDescription } }
    const submitEvent = { preventDefault: () => {} }
    wrapper.find('input[type="text"]').simulate('change', changeEvent)
    expect(wrapper.find('input[type="text"]').prop('value')).toBe(taskDescription)
    wrapper.find('form').simulate('submit', submitEvent)
    expect(mockOnTaskCreate.mock.calls.length).toBe(1)
    expect(mockOnTaskCreate.mock.calls[0][0]).toBe(taskDescription)
    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(true)
    expect(wrapper.find('input[type="text"]').prop('value')).toBe('')
    expect(wrapper.contains(<span>💾 Creation in progress...</span>)).toBeTruthy()
  })

  test('should clear description text input on reset', () => {
    const taskDescription = 'Learn React'
    const changeEvent = { currentTarget: { value: taskDescription } }
    wrapper.find('input[type="text"]').simulate('change', changeEvent)
    expect(wrapper.find('input[type="text"]').prop('value')).toBe(taskDescription)
    wrapper.find('form').simulate('reset')
    expect(wrapper.find('input[type="text"]').prop('value')).toBe('')
  })
})
