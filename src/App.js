import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// contexts
import AuthContext from './contexts/AuthContext'
import FirestoreContext from './contexts/FiretoreContext'
// Private Route
import PrivateRoute from './routes/PrivateRoute'
// pages
import Main from './pages/main/Main.jsx'
import LoginPage from './pages/login/LoginPage.jsx'
import SignUpPage from './pages/signup/SignUpPage.jsx'
const App = () => {

  return (
    <Router>
      <AuthContext>
        <FirestoreContext>
          <Switch>
            <PrivateRoute exact path='/' component={Main} />
            <PrivateRoute exact path='/chat/:param' component={Main} />
            <Route path='/login' component={LoginPage} />
            <Route path='/signup' component={SignUpPage} />
          </Switch>
        </FirestoreContext>
      </AuthContext>
    </Router>
  )
}

export default App
