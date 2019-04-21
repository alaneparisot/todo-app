import React, { useEffect, useState } from 'react'
import { Link, match as Match } from 'react-router-dom'

import Task from '../types/Task'
import db from '../db/firebase'

type Props = {
  match: Match<{ id: string }>
}

export default ({ match }: Props) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>()

  useEffect(() => {
    db.collection('tasks')
      .doc(match.params.id)
      .get()
      .then(doc => {
        if (doc.exists) {
          setSelectedTask({ id: doc.id, ...doc.data() } as Task)
        } else {
          setSelectedTask(null)
        }
      })
      .catch(error => console.error('Error getting document: ', error))
  }, [])

  return (
    <>
      <h2>Task {match.params.id}</h2>

      {selectedTask ? (
        <ul>
          <li>
            <strong>Description: </strong>
            {selectedTask.description}
          </li>
          <li>
            <strong>Done: </strong>
            {selectedTask.isDone ? 'Yeah! 😎' : 'Not yet 😁'}
          </li>
        </ul>
      ) : (
        <p>{selectedTask === undefined ? '🚚 Loading...' : "Task can't be found... 😔"}</p>
      )}

      <Link to='/tasks'>Go to task list</Link>
    </>
  )
}
