import React, { useContext } from 'react'
import { GetChats } from '../../contexts/FiretoreContext.jsx'
import { CurrentUser } from '../../contexts/AuthContext.jsx'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
const ChatItem = styled.div`
  background: #f7f7f7;
  max-width: 40%;
  margin: 1rem 0;
  /* margin: auto; */
`
const Chatbox = () => {
  const [chatData] = useContext(GetChats)
  const [currentUser] = useContext(CurrentUser)
  const { param } = useParams()

  return (
    <div style={{ height: '90vh', maxHeight: '90vh', overflow: 'scroll' }}>
      {!param && (
        <div
          style={{ height: '90vh' }}
          className='d-flex justify-content-center align-items-center'
        >
          <h1 className='text-secondary display-4 text-center'>
            Please select a chat room!
          </h1>
        </div>
      )}
      {chatData
        .filter(item => item.id === param)
        .map((item, index) => (
          <div key={index}>
            <h4>{item.title}</h4>
            {item.chats.map((item, index) => (
              <ChatItem
                key={index}
                className={`p-4 ${
                  item.email === currentUser.email &&
                  'ml-auto bg-primary text-white'
                }`}
              >
                <div>
                  <h6
                    className={`m-0 p-0 mb-2 ${
                      item.email === currentUser.email
                        ? 'text-white'
                        : 'text-dark'
                    }`}
                  >
                    {item.email.slice(0, item.email.indexOf('@'))}
                  </h6>
                  <p className='m-0 p-0'>{item.message}</p>
                  <p
                    className={`m-0 p-0 mt-2 ${
                      item.email === currentUser.email
                        ? 'text-light'
                        : 'text-secondary'
                    }`}
                  >
                    {item.date}
                  </p>
                </div>
              </ChatItem>
            ))}
          </div>
        ))}
    </div>
  )
}

export default Chatbox
