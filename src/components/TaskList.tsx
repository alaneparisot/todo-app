import React from 'react'

import Task from '../types/Task'
import TaskListItem from './TaskListItem'

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
        <ul>{taskListItems}</ul>
      ) : (
        <p>
          Seems like you achieved all your tasks 🎉 <em>Add a new one!</em>
        </p>
      )}
    </>
  )
}
