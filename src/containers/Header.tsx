import React from 'react'
import { NavLink } from 'react-router-dom'

export default () => {
  return (
    <header>
      <h1>Todo App</h1>
      <nav>
        <ul>
          <li>
            <NavLink to='/' exact>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/tasks'>Tasks</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
