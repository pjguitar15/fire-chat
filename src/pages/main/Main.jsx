import React, { useContext, useState } from 'react'
import { Logout, CurrentUser } from '../../contexts/AuthContext.jsx'
import { useHistory, useParams } from 'react-router-dom'
import {
  CreateNewChat,
  GetChats,
  AddChat
} from '../../contexts/FiretoreContext.jsx'
import { Row, Col, Button as BootstrapBtn, Form } from 'react-bootstrap'
import { Modal, Button } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import {
  ChatForm,
  EmojiButton,
  ImageUploadButton,
  EmojiCard,
  SidebarChatItem
} from './Styles.jsx'
import Chatbox from './Chatbox.jsx'
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
  const addChat = useContext(AddChat)
  const [chatData] = useContext(GetChats)
  const [currentUser] = useContext(CurrentUser)
  const history = useHistory()
  const { param } = useParams()
  // functions
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject)
    setChatValue(chatValue + emojiObject.emoji)
  }
  const formSubmit = e => {
    e.preventDefault()
    // console.log(chatValue)
    setChatValue('')
    // take email, id, message as objects
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
          {
            id: uuidv4(),
            email: currentUser.email,
            message: initialChat,
            date: moment().format('llll')
          }
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
  const chatItemClicked = item => {
    history.push(`/chat/${item.id}`)
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
              className='fas fa-comments my-5'
            ></i>
            <h3 className='text-white'>
              Welcome{' '}
              {currentUser.email.slice(0, currentUser.email.indexOf('@'))}!
            </h3>
            <p className='lead'>
              Create a chat room by clicking Create Chat Room
            </p>
            <Button onClick={showModal} size='sm'>
              Create Chat Room
            </Button>
          </div>

          <h5 className='text-white'>Chats</h5>
          <div
            style={{ height: '32rem', maxHeight: '32rem', overflow: 'scroll' }}
          >
            {chatData.map((item, index) => (
              <SidebarChatItem
                onClick={() => chatItemClicked(item)}
                key={index}
                className='bg-light my-2 text-dark p-3 rounded'
              >
                <div>
                  <h5 className='p-0 m-0'>{item.title}</h5>
                  <p className='p-0 m-0'>
                    {item.chats.length} message
                    {item.chats.length > 1 ? 's' : ''}
                  </p>
                </div>
              </SidebarChatItem>
            ))}
          </div>

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
          <Chatbox />
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
