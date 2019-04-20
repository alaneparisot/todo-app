import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './Header'
import Home from './Home'
import Tasks from './Tasks'
import Page404 from './Page404'

export default () => {
  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/tasks' component={Tasks} />
        <Route component={Page404} />
      </Switch>
    </BrowserRouter>
  )
}
