import React from 'react'

import Task from '../types/Task'

export default ({
  task,
  onTaskStatusChange,
  onTaskDelete,
}: {
  task: Task
  onTaskStatusChange: (task: Task) => void
  onTaskDelete: (taskId: string) => void
}) => (
  <li>
    <label>
      {task.description}
      <input type='checkbox' checked={task.isDone} onChange={() => onTaskStatusChange(task)} />
    </label>
    {task.isDone && <button onClick={() => onTaskDelete(task.id)}>Delete</button>}
  </li>
)
