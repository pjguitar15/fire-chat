import React, { useContext, useState } from 'react'
import { Logout, CurrentUser } from '../../contexts/AuthContext.jsx'
import { useHistory, useParams } from 'react-router-dom'
import { GetChats, AddChat } from '../../contexts/FiretoreContext.jsx'
import { Button } from 'antd'
import { Row, Col, Button as BootstrapBtn } from 'react-bootstrap'
import ModalComp from './ModalComp.jsx'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import {
  ChatForm,
  EmojiButton,
  ImageUploadButton,
  EmojiCard,
  SidebarChatItem,
  SidebarChatWrapper
} from './Styles.jsx'
import Chatbox from './Chatbox.jsx'
import Picker from 'emoji-picker-react'

const Main = () => {
  const [emojiShow, setEmojiShow] = useState(false)
  const [chosenEmoji, setChosenEmoji] = useState(null)
  const [chatValue, setChatValue] = useState('')
  // const [search, setSearch] = useState('')
  const [visible, setVisible] = useState(false)

  // context
  const logout = useContext(Logout)

  const addChat = useContext(AddChat)
  const [chatData] = useContext(GetChats)
  const [currentUser] = useContext(CurrentUser)
  const history = useHistory()
  const { param } = useParams()

  // functions
  const showModal = () => {
    setVisible(true)
  }
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject)
    setChatValue(chatValue + emojiObject.emoji)
  }
  const formSubmit = e => {
    e.preventDefault()

    setChatValue('')
    // take email, id, message as object
    addChat(
      {
        email: currentUser.email,
        id: uuidv4(),
        message: chatValue,
        date: moment().format('llll')
      },
      param
    )
  }

  const chatItemClicked = item => {
    history.push(`/chat/${item.id}`)
  }
  return (
    <div>
      <ModalComp visible={visible} setVisible={setVisible} />
      <Row style={{ height: '100vh' }} className='m-0'>
        {/* Sidebar Column */}
        <Col
          lg='3'
          className='text-white position-relative px-3'
          style={{ background: '#097FF5' }}
        >
          <div className='text-center'>
            <i
              style={{ fontSize: '3rem' }}
              className='fas fa-comments my-3'
            ></i>

            <div className='mb-2'>
              Logged in as{' '}
              {currentUser.email.slice(0, currentUser.email.indexOf('@'))}
            </div>

            <div className='text-center'>
              <Button onClick={showModal} size='sm'>
                Create Chat Room
              </Button>
            </div>
          </div>

          <h5 className='text-white ml-3'>Chats</h5>
          {/* <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className='form-control col-11 ml-2 my-2'
            placeholder='Search for Chat rooms'
            type='text'
          /> */}

          {/* chat rooms */}
          <SidebarChatWrapper>
            {chatData.map((item, index) => (
              <SidebarChatItem
                onClick={() => chatItemClicked(item)}
                key={index}
                className='bg-light my-1 text-dark p-3 rounded'
              >
                <div>
                  <h6 className='p-0 m-0'>{item.title}</h6>
                  <p className='p-0 m-0'>
                    {item.chats.length} message
                    {item.chats.length > 1 ? 's' : ''}
                  </p>
                </div>
              </SidebarChatItem>
            ))}
          </SidebarChatWrapper>

          <BootstrapBtn
            style={{ bottom: '1rem', left: '0', right: '0', margin: 'auto' }}
            variant='outline-light col-10 position-absolute'
            size='sm'
            onClick={logout}
          >
            Logout
          </BootstrapBtn>
          {/* End of Sidebar */}

          {/* Main Column */}
        </Col>
        <Col lg='9' className='position-relative'>
          <Chatbox chatItemClicked={chatItemClicked} />
          {/* Bottom Fixed Chat Form */}
          <div
            className='position-absolute p-4 bg-white'
            style={{ bottom: '0', left: '0', right: '0' }}
          >
            {/* message input */}
            <Row className='m-0'>
              <Col lg='10' xs='9'>
                <form onSubmit={formSubmit}>
                  <ChatForm
                    value={chatValue}
                    onChange={e => setChatValue(e.target.value)}
                    placeholder='Type a message..'
                  />
                </form>
              </Col>
              <Col className='position-relative' lg='2' xs='3'>
                <EmojiButton
                  onClick={() => setEmojiShow(!emojiShow)}
                  className='far fa-smile-beam'
                ></EmojiButton>
                {/* <ImageUploadButton className='fas fa-image' /> */}
                <EmojiCard className={`${emojiShow ? 'd-block' : 'd-none'}`}>
                  {chosenEmoji ? (
                    <span>You chose: {chosenEmoji.emoji}</span>
                  ) : (
                    <span>No emoji Chosen</span>
                  )}
                  <Picker show={false} onEmojiClick={onEmojiClick} />
                </EmojiCard>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Main
