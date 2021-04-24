import React, { useState, useContext } from 'react'
import { Form } from 'react-bootstrap'
import { Modal } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import { CreateNewChat } from '../../contexts/FiretoreContext.jsx'
import { CurrentUser } from '../../contexts/AuthContext.jsx'
const ModalComp = ({ visible, setVisible }) => {
  const [chatTitleInput, setChatTitleInput] = useState('')
  const [initialChat, setInitialChat] = useState('')
  const [confirmLoading, setConfirmLoading] = useState(false)
  // context
  const createNewChat = useContext(CreateNewChat)
  const [currentUser] = useContext(CurrentUser)
  const showModal = () => {
    setVisible(true)
  }
  const handleCancel = () => {
    console.log('Clicked cancel button')
    setVisible(false)
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
  return (
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
  )
}

export default ModalComp
