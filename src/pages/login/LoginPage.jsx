import React, { useContext, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Row, Col, Form, Alert } from 'react-bootstrap'
import { MyFormControl, LoginButton, Logo } from './Styled.jsx'
import { Login } from '../../contexts/AuthContext.jsx'
const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const login = useContext(Login)
  const emailRef = useRef()
  const passwordRef = useRef()
  const history = useHistory()
  const formSubmitHandler = async e => {
    e.preventDefault()
    try {
      setLoading(true)
      setError('')
      await login(emailRef.current.value, passwordRef.current.value)
      history.push('/')
    } catch (error) {
      setError('Invalid Credentials')
      setLoading(false)
    }
    setLoading(false)
  }
  return (
    <div>
      <Row className='m-0'>
        <Col
          style={{ height: '100vh', background: '#097FF5' }}
          className='p-3 text-white d-none d-lg-block'
          lg='4'
          md='12'
        >
          <h6 className='text-white'>
            Built with <i className='fab fa-react'></i> React
          </h6>
          <div className='d-flex flex-column mt-5 text-center justify-content-center align-items-center'>
            <Logo
              style={{ fontSize: '6rem' }}
              className='fas fa-comments my-5'
            ></Logo>
            <h1 className='display-4 mt-4 text-white'>Chat Web App</h1>
            <p className='mt-2 col-xl-10 col-lg-12 col-sm-12 lead text-center'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              perferendis vero impedit. Rem, quia sint. Molestias, ipsa fugit
              dignissimos.
            </p>
          </div>
        </Col>
        <Col lg='8' md='12' className='p-2'>
          <Form
            onSubmit={formSubmitHandler}
            className='col-xl-7 col-lg-9 col-md-7 col-sm-9 col-xs-10 mx-auto pt-md-5'
          >
            <h1 className='text-center mt-5'>Login Account</h1>
            <p className='text-secondary lead text-center'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>

            <Alert show={error !== ''} variant='danger'>
              {error}
            </Alert>
            <Form.Group className='mt-md-5'>
              <MyFormControl
                ref={emailRef}
                placeholder='Enter email'
                type='email'
              />
            </Form.Group>
            <Form.Group>
              <MyFormControl
                ref={passwordRef}
                placeholder='Enter password'
                type='password'
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                label='Check me out'
                className='text-secondary'
                type='checkbox'
              />
            </Form.Group>
            <LoginButton disabled={loading} className='mt-3'>
              {loading ? 'Signing you in...' : 'Log In'}
            </LoginButton>
            <div
              className='lead mt-2 text-center text-md-left'
              style={{ fontSize: '16px' }}
            >
              <span>Create an Account? </span>
              <Link to='/signup' className='font-weight-bold'>
                Sign Up
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default LoginPage
