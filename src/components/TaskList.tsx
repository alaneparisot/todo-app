import React from 'react'

import Task from '../types/Task'
import TaskListItem from './TaskListItem'

export default ({
  tasks,
  onTaskStatusChange,
  onTaskDelete,
}: {
  tasks: Task[]
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

  return tasks.length > 0 ? <ul>{taskListItems}</ul> : <em>Add a new task!</em>
}
