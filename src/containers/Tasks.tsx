import React, { useEffect, useState } from 'react'
import { match as Match, Route, Switch } from 'react-router-dom'
import { History } from 'history'

import Task from '../types/Task'
import TaskList from '../components/TaskList'
import TaskCreation from '../components/TaskCreation'
import TaskDetail from '../components/TaskDetail'
import db from '../db/firebase'

export default ({ history, match }: { history: History; match: Match }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    db.collection('tasks')
      .get()
      .then(querySnapshot => {
        setTasks(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task)))
        setIsLoading(false)
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

  const handleTaskCreation = async (description: string): Promise<void> => {
    try {
      const newTask = {
        description,
        isDone: false,
      }
      const docRef = await db.collection('tasks').add(newTask)
      const updatedTasks: Task[] = [...tasks, { id: docRef.id, ...newTask }]
      setTasks(updatedTasks)
      history.push(match.url)
    } catch (error) {
      console.error('Error adding document: ', error)
    }
  }

  const handleCreateNewTaskClick = () => {
    history.push(`${match.url}/new`)
  }

  const taskList = (
    <>
      <TaskList
        tasks={tasks}
        isLoading={isLoading}
        onTaskStatusChange={handleTaskStatusChange}
        onTaskDelete={handleTaskDelete}
      />

      <button type='button' onClick={handleCreateNewTaskClick}>
        Create a new task
      </button>
    </>
  )

  const taskCreation = <TaskCreation onTaskCreate={handleTaskCreation} />

  return (
    <Switch>
      <Route path={match.url} exact render={() => taskList} />
      <Route path={`${match.url}/new`} render={() => taskCreation} />
      <Route path={`${match.url}/:id`} component={TaskDetail} />
    </Switch>
  )
}
