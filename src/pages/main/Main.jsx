import React, { useContext, useState } from 'react'
import { Logout, CurrentUser } from '../../contexts/AuthContext.jsx'
import { useHistory, useParams } from 'react-router-dom'
import { CreateNewChat, GetChats } from '../../contexts/FiretoreContext.jsx'
import { Row, Col, Button as BootstrapBtn, Form } from 'react-bootstrap'
import { Modal, Button } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import {
  ChatForm,
  EmojiButton,
  ImageUploadButton,
  EmojiCard,
  SidebarChatItem
} from './Styles.jsx'
import Picker from 'emoji-picker-react'
const Main = () => {
  const [emojiShow, setEmojiShow] = useState(false)
  const [chosenEmoji, setChosenEmoji] = useState(null)
  const [chatValue, setChatValue] = useState('')
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  // modal state
  const [chatTitleInput, setChatTitleInput] = useState('')
  const [initialChat, setInitialChat] = useState('')
  // context
  const logout = useContext(Logout)
  const createNewChat = useContext(CreateNewChat)
  const [chatData] = useContext(GetChats)
  const [currentUser, setCurrentUser] = useContext(CurrentUser)
  const history = useHistory()
  const { param } = useParams()
  // functions
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject)
    setChatValue(chatValue + emojiObject.emoji)
  }
  const formSubmit = e => {
    e.preventDefault()
    console.log(chatValue)
    setChatValue('')
  }
  const showModal = () => {
    setVisible(true)
  }
  const handleOk = async () => {
    setConfirmLoading(true)
    try {
      await createNewChat({
        id: uuidv4(),
        host: currentUser.email,
        title: chatTitleInput,
        chats: [
          { id: uuidv4(), email: currentUser.email, message: initialChat }
        ]
      })
      setChatTitleInput('')
      setInitialChat('')
      setConfirmLoading(false)
      setVisible(false)
    } catch (error) {
      setChatTitleInput('')
      setInitialChat('')
      setConfirmLoading(false)
      console.log(error)
      setVisible(false)
    }
  }
  const handleCancel = () => {
    console.log('Clicked cancel button')
    setVisible(false)
  }
  const chatItemClicked = id => {
    history.push(`/chat/${id}`)
  }
  return (
    <div>
      <Modal
        title='Create Chat Room'
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Group>
            <Form.Control
              value={chatTitleInput}
              onChange={e => setChatTitleInput(e.target.value)}
              placeholder='Chat title'
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              value={initialChat}
              onChange={e => setInitialChat(e.target.value)}
              placeholder='Enter initial message'
            />
          </Form.Group>
        </Form>
      </Modal>
      <Row style={{ height: '100vh' }} className='m-0'>
        <Col
          lg='3'
          className='text-white position-relative px-3'
          style={{ background: '#097FF5' }}
        >
          <div className='text-center'>
            <i
              style={{ fontSize: '6rem' }}
              className='my-4 fab fa-instalod'
            ></i>
            <h3 className='text-white'>
              Welcome!{' '}
              {currentUser.email.slice(0, currentUser.email.indexOf('@'))}
            </h3>
            <p className='lead'>
              Create a chat room by clicking Create Chat Room
            </p>
            <Button onClick={showModal} size='sm'>
              Create Chat Room
            </Button>
          </div>

          <h5 className='text-white'>Chats</h5>
          {chatData.map((item, index) => (
            <SidebarChatItem
              onClick={() => chatItemClicked(item.id)}
              key={index}
              className='bg-light my-2 text-dark p-3 rounded'
            >
              <div>
                <h5 className='p-0 m-0'>{item.title}</h5>
                <p className='p-0 m-0'>{item.chats.length} people</p>
              </div>
            </SidebarChatItem>
          ))}

          <BootstrapBtn
            style={{ bottom: '1rem', left: '0', right: '0', margin: 'auto' }}
            variant='outline-light col-10 position-absolute'
            size='sm'
            onClick={logout}
          >
            Logout
          </BootstrapBtn>
        </Col>
        <Col lg='9' className='position-relative'>
          <h1>Test</h1>
          {/* Bottom Fixed Chat Form */}
          <div
            className='position-absolute p-4 bg-white'
            style={{ bottom: '0', left: '0', right: '0' }}
          >
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
                <ImageUploadButton className='fas fa-image' />
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
