import React, { useState } from 'react'

import Task from '../types/Task'
import TaskList from '../components/TaskList'
import TaskAdd from '../components/TaskAdd'
import tasks_ from '../assets/mocks/tasks'

export default () => {
  const [tasks, setTasks]: [Task[], (tasks: Task[]) => void] = useState(tasks_)

  const handleTaskStatusChange = (task: Task): void => {
    const taskIndex: number = tasks.findIndex(({ id }) => id === task.id)
    const updatedTask: Task = { ...task, isDone: !task.isDone }
    const tasksCopy: Task[] = [...tasks]
    tasksCopy.splice(taskIndex, 1, updatedTask)
    setTasks(tasksCopy)
  }

  const handleTaskDelete = (taskId: string): void => {
    const taskIndex: number = tasks.findIndex(({ id }) => id === taskId)
    const tasksCopy: Task[] = [...tasks]
    tasksCopy.splice(taskIndex, 1)
    setTasks(tasksCopy)
  }

  const handleTaskAdd = (description: string): void => {
    const newTask: Task = {
      id: Date.now().toString(),
      description,
      isDone: false,
    }
    const updatedTasks: Task[] = [...tasks, newTask]
    setTasks(updatedTasks)
  }

  return (
    <div>
      <h1>Todo App</h1>

      <h2>Tasks</h2>
      <TaskList
        tasks={tasks}
        onTaskStatusChange={handleTaskStatusChange}
        onTaskDelete={handleTaskDelete}
      />

      <h2>Add a new task</h2>
      <TaskAdd onTaskAdd={handleTaskAdd} />
    </div>
  )
}
