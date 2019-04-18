import React, { useState } from 'react'

export default ({ onTaskAdd }: { onTaskAdd: (description: string) => void }) => {
  const [description, setDescription] = useState<string>('')

  const handleDescriptionChange = (event: React.FormEvent<HTMLInputElement>) => {
    setDescription(event.currentTarget.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onTaskAdd(description)
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Description:
        <input type='text' value={description} onChange={handleDescriptionChange} />
      </label>
      <input type='submit' value='Add' />
    </form>
  )
}
