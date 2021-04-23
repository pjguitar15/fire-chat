import React, { useState, useEffect } from 'react'
import { auth } from '../firebase/config'
export const CurrentUser = React.createContext()
export const Login = React.createContext()
export const SignUp = React.createContext()
export const Logout = React.createContext()
export const ResetPassword = React.createContext()
export const UpdateEmail = React.createContext()
export const UpdatePassword = React.createContext()
const AuthContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
  }
  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  }
  const logout = () => {
    return auth.signOut()
  }
  const resetPassword = email => {
    return auth.sendPasswordResetEmail(email)
  }
  const updateEmail = email => {
    return currentUser.updateEmail(email)
  }
  const updatePassword = password => {
    return currentUser.updatePassword(password)
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])
  return (
    <CurrentUser.Provider value={[currentUser, setCurrentUser]}>
      <Login.Provider value={login}>
        <SignUp.Provider value={signup}>
          <Logout.Provider value={logout}>
            <ResetPassword.Provider value={resetPassword}>
              <UpdateEmail.Provider value={updateEmail}>
                <UpdatePassword.Provider value={updatePassword}>
                  {!loading && children}
                </UpdatePassword.Provider>
              </UpdateEmail.Provider>
            </ResetPassword.Provider>
          </Logout.Provider>
        </SignUp.Provider>
      </Login.Provider>
    </CurrentUser.Provider>
  )
}

export default AuthContext
