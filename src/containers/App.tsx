import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './Header'
import Home from './Home'
import Tasks from './Tasks'

const Page404 = lazy(() => import('./Page404'))

export default () => {
  const suspendedPage404 = (
    <Suspense fallback={<p>Loading...</p>}>
      <Page404 />
    </Suspense>
  )

  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/tasks' component={Tasks} />
        <Route render={() => suspendedPage404} />
      </Switch>
    </BrowserRouter>
  )
}
