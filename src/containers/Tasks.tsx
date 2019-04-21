import React, { lazy, useEffect, useState, Suspense } from 'react'
import { match as Match, Route, Switch } from 'react-router-dom'
import { History } from 'history'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import Task from '../types/Task'
import TaskList from '../components/TaskList'
import Loading from '../components/Loading'
import StoreState from '../types/StoreState'
import * as taskActions from '../actions/taskActions'
import db from '../db/firebase'

const TaskCreation = lazy(() => import('../components/TaskCreation'))
const TaskDetail = lazy(() => import('../components/TaskDetail'))

type Props = {
  tasks: Task[]
  onAddTask: (task: Task) => taskActions.AddTask
  onDeleteTask: (id: string) => taskActions.DeleteTask
  onSetTasks: (tasks: Task[]) => taskActions.SetTasks
  onToggleTask: (id: string, isDone: boolean) => taskActions.ToggleTask
  history: History
  match: Match
}

const Tasks = ({
  tasks,
  onAddTask,
  onDeleteTask,
  onSetTasks,
  onToggleTask,
  history,
  match,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    db.collection('tasks')
      .get()
      .then(querySnapshot => {
        onSetTasks(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task)))
        setIsLoading(false)
      })
      .catch(error => console.error('Error getting documents: ', error))
  }, [])

  const handleTaskStatusChange = async (task: Task): Promise<void> => {
    const isDone = !task.isDone
    try {
      await db
        .collection('tasks')
        .doc(task.id)
        .update({ isDone })
      onToggleTask(task.id, isDone)
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
      onDeleteTask(taskId)
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
      onAddTask({ id: docRef.id, ...newTask })
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

  const suspendedTaskCreation = (
    <Suspense fallback={<Loading />}>
      <TaskCreation onTaskCreate={handleTaskCreation} />
    </Suspense>
  )

  const buildSuspendedTaskDetail = (props: any) => (
    <Suspense fallback={<Loading />}>
      <TaskDetail {...props} />
    </Suspense>
  )

  return (
    <Switch>
      <Route path={match.url} exact render={() => taskList} />
      <Route path={`${match.url}/new`} render={() => suspendedTaskCreation} />
      <Route path={`${match.url}/:id`} render={buildSuspendedTaskDetail} />
    </Switch>
  )
}

const mapStateToProps = (state: StoreState) => ({
  tasks: state.task.tasks,
})

const mapDispatchToProps = (dispatch: Dispatch<taskActions.TaskAction>) => ({
  onAddTask: (task: Task) => dispatch(taskActions.addTask(task)),
  onDeleteTask: (id: string) => dispatch(taskActions.deleteTask(id)),
  onSetTasks: (tasks: Task[]) => dispatch(taskActions.setTasks(tasks)),
  onToggleTask: (id: string, isDone: boolean) => dispatch(taskActions.toggleTask(id, isDone)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tasks)
