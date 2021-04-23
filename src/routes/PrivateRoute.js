import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { CurrentUser } from '../contexts/AuthContext.jsx'
const PrivateRoute = ({ component: Component, ...rest }) => {
  const [currentUser, setCurrentUser] = useContext(CurrentUser)
  return (
    <Route {...rest}
      render={props => {
        return currentUser ? <Component {...props} />
          : <Redirect to='/login' />
      }}>

    </Route>
  )
}

export default PrivateRoute