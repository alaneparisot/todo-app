import React from 'react'
import { Link } from 'react-router-dom'

import Task from '../types/Task'

type Props = {
  task: Task
  onTaskStatusChange: (task: Task) => void
  onTaskDelete: (taskId: string) => void
}

export default ({ task, onTaskStatusChange, onTaskDelete }: Props) => (
  <li>
    <Link to={`/tasks/${task.id}`}>{task.description}</Link>
    <input type='checkbox' checked={task.isDone} onChange={() => onTaskStatusChange(task)} />
    {task.isDone && <button onClick={() => onTaskDelete(task.id)}>Delete</button>}
  </li>
)
