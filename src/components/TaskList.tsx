import React, { lazy, Suspense } from 'react'

import Task from '../types/Task'

const TaskListItem = lazy(() => import('./TaskListItem'))

export default ({
  tasks,
  isLoading,
  onTaskStatusChange,
  onTaskDelete,
}: {
  tasks: Task[]
  isLoading: boolean
  onTaskStatusChange: (task: Task) => void
  onTaskDelete: (taskId: string) => void
}) => {
  const taskListItems: JSX.Element[] = tasks.map(
    (task: Task): JSX.Element => (
      <TaskListItem
        task={task}
        onTaskStatusChange={onTaskStatusChange}
        onTaskDelete={onTaskDelete}
        key={task.id}
      />
    ),
  )

  return (
    <>
      <h2>Tasks</h2>

      {isLoading ? (
        <p>🚚 Loading...</p>
      ) : tasks.length > 0 ? (
        <Suspense fallback={<p>🚚 Loading...</p>}>
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
