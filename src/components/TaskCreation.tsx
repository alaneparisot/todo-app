import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default ({ onTaskCreate }: { onTaskCreate: (description: string) => void }) => {
  const [description, setDescription] = useState<string>('')
  const [isCreating, setIsCreating] = useState<boolean>(false)

  const handleDescriptionChange = (event: React.FormEvent<HTMLInputElement>) => {
    setDescription(event.currentTarget.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onTaskCreate(description)
    setDescription('')
    setIsCreating(true)
    // Redirected to /tasks by parent's method
  }

  const handleReset = () => {
    setDescription('')
  }

  return (
    <>
      <h2>Create a new task</h2>

      <form onSubmit={handleSubmit} onReset={handleReset}>
        <label>
          Description:
          <input
            type='text'
            placeholder='Visit California 🌉'
            value={description}
            onChange={handleDescriptionChange}
          />
        </label>
        <input type='submit' value='Create' disabled={isCreating} />
        <input type='reset' value='Clear' />
        {isCreating && <span>💾 Creation in progress...</span>}
      </form>

      <p>
        <Link to='/tasks'>Go to task list</Link>
      </p>
    </>
  )
}
