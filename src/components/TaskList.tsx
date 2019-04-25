import React, { lazy, Suspense } from 'react'

import Task from '../types/Task'
import Loading from '../components/Loading'

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
        <p>
          Seems like you achieved all your tasks 🎉 <em>Add a new one!</em>
        </p>
      )}
    </>
  )
}
