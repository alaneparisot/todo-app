import React, { useEffect, useState } from 'react'

import Task from '../types/Task'
import TaskList from '../components/TaskList'
import TaskAdd from '../components/TaskAdd'
import db from '../db/firebase'

export default () => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    db.collection('tasks')
      .get()
      .then(querySnapshot => {
        setTasks(
          querySnapshot.docs.map(doc => {
            const { description, isDone } = doc.data()
            return {
              id: doc.id,
              description,
              isDone,
            }
          }),
        )
      })
      .catch(error => console.error('Error getting documents: ', error))
  }, [])

  const handleTaskStatusChange = async (task: Task): Promise<void> => {
    const taskIndex: number = tasks.findIndex(({ id }) => id === task.id)
    const update = { isDone: !task.isDone }
    const updatedTask: Task = { ...task, ...update }

    try {
      await db
        .collection('tasks')
        .doc(task.id)
        .update(update)
      const tasksCopy: Task[] = [...tasks]
      tasksCopy.splice(taskIndex, 1, updatedTask)
      setTasks(tasksCopy)
    } catch (error) {
      console.error('Error updating document: ', error)
    }
  }

  const handleTaskDelete = async (taskId: string): Promise<void> => {
    try {
      await db
        .collection('tasks')
        .doc(taskId)
        .delete()
      const taskIndex: number = tasks.findIndex(({ id }) => id === taskId)
      const tasksCopy: Task[] = [...tasks]
      tasksCopy.splice(taskIndex, 1)
      setTasks(tasksCopy)
    } catch (error) {
      console.error('Error removing document: ', error)
    }
  }

  const handleTaskAdd = async (description: string): Promise<void> => {
    try {
      const newTask = {
        description,
        isDone: false,
      }
      const docRef = await db.collection('tasks').add(newTask)
      const updatedTasks: Task[] = [...tasks, { id: docRef.id, ...newTask }]
      setTasks(updatedTasks)
    } catch (error) {
      console.error('Error adding document: ', error)
    }
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
