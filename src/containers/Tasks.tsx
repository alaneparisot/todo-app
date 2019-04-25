import React, { lazy, useEffect, useState, Suspense } from 'react'
import { match as Match, Route, Switch } from 'react-router-dom'
import { History } from 'history'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import Task from '../types/Task'
import TaskList from '../components/TaskList'
import Loading from '../components/Loading'
import StoreState from '../types/StoreState'
import * as taskActions from '../actions/taskActions'

const TaskCreation = lazy(() => import('../components/TaskCreation'))
const TaskDetail = lazy(() => import('../components/TaskDetail'))

type Props = {
  tasks: Task[]
  onAddTask: (description: string) => Promise<void>
  onDeleteTask: (task: Task) => Promise<void>
  onGetTasks: () => Promise<void>
  onToggleTask: (task: Task) => Promise<void>
  history: History
  match: Match
}

const Tasks = ({ tasks, onAddTask, onDeleteTask, onGetTasks, onToggleTask, history, match }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const init = async () => {
      await onGetTasks()
      setIsLoading(false)
    }
    init()
  }, [])

  const handleTaskStatusChange = async (task: Task): Promise<void> => {
    await onToggleTask(task)
  }

  const handleTaskDelete = async (task: Task): Promise<void> => {
    await onDeleteTask(task)
  }

  const handleTaskCreation = async (description: string): Promise<void> => {
    await onAddTask(description)
    history.push(match.url)
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

      <p>
        <button type="button" onClick={handleCreateNewTaskClick}>
          Create a new task
        </button>
      </p>
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

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, taskActions.TaskAction>) => ({
  onAddTask: (description: string) => dispatch(taskActions.addTask(description)),
  onDeleteTask: (task: Task) => dispatch(taskActions.deleteTask(task)),
  onGetTasks: () => dispatch(taskActions.getTasks()),
  onToggleTask: (task: Task) => dispatch(taskActions.toggleTask(task)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tasks)
