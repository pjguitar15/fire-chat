import React, { useContext, useEffect, useRef } from 'react'
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
const ChatBoxWrapper = styled.div`
  height: 85vh;
  max-height: 85vh;
  overflow: scroll;
  margin-top: 3.5rem;
  padding: 2rem;
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #0ae;

    background-image: -webkit-gradient(
      linear,
      0 0,
      0 100%,
      color-stop(0.5, rgba(255, 255, 255, 0.2)),
      color-stop(0.5, transparent),
      to(transparent)
    );
  }
`
const Chatbox = ({ chatItemClicked }) => {
  const [chatData] = useContext(GetChats)
  const [currentUser] = useContext(CurrentUser)
  const { param } = useParams()
  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatData])
  useEffect(() => {
    scrollToBottom()
  }, [chatItemClicked])
  return (
    <ChatBoxWrapper>
      {!param && (
        <div
          style={{ height: '85vh' }}
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
            <h4 className='mt-3 position-absolute' style={{ top: '0' }}>
              {item.title}
            </h4>
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
                {/* this ref is for scroll target */}
              </ChatItem>
            ))}
            <div ref={messagesEndRef} />
          </div>
        ))}
    </ChatBoxWrapper>
  )
}

export default Chatbox
