import React, { lazy, Suspense } from 'react'

import Loading from '../components/Loading'
import Task from '../types/Task'

const TaskListItem = lazy(() => import('./TaskListItem'))

type Props = {
  tasks: Task[]
  isLoading: boolean
  onTaskStatusChange: (task: Task) => void
  onTaskDelete: (task: Task) => void
}

export default ({ tasks, isLoading, onTaskStatusChange, onTaskDelete }: Props) => {
  const taskListItems: JSX.Element[] = tasks.map(
    (task: Task): JSX.Element => (
      <TaskListItem task={task} onTaskStatusChange={onTaskStatusChange} onTaskDelete={onTaskDelete} key={task.id} />
    ),
  )

  return (
    <>
      <h2>Tasks</h2>

      {isLoading ? (
        <Loading />
      ) : tasks.length > 0 ? (
        <Suspense fallback={<Loading />}>
          <ul>{taskListItems}</ul>
        </Suspense>
      ) : (
        <p className="no-tasks">
          No tasks found... <em>Create a new one!</em>
        </p>
      )}
    </>
  )
}
