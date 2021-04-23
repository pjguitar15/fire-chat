import styled from 'styled-components'
const MyFormControl = styled.input`
  width: 100%;
  border: none;
  border-left: #097ff5 solid 5px;
  background: #f7f7f7;
  height: 3rem;
  padding-left: 1rem;
  &:focus {
    outline: none;
  }
`
const LoginButton = styled.button`
  background: #097ff5;
  color: white;
  border: none;
  width: 100%;
  border-radius: 50px;
  padding: 0.7rem 0;
  &:disabled {
    background: #66b3ff;
    cursor: progress;
  }
`
const Logo = styled.i`
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2);
`
export { MyFormControl, LoginButton, Logo }
