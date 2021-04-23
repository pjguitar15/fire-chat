import React, { useState, useEffect } from 'react'
import firebase from '../firebase/config'

export const GetChats = React.createContext()
export const CreateNewChat = React.createContext()
export const AddChat = React.createContext()

const FiretoreContext = ({ children }) => {
  const [chatData, setChatData] = useState([])
  const [loading, setLoading] = useState(false)
  const ref = firebase.firestore().collection('chats')
  //REALTIME GET FUNCTION
  function getChat() {
    setLoading(true)
    ref.onSnapshot(querySnapshot => {
      const items = []
      querySnapshot.forEach(doc => {
        items.push(doc.data())
      })
      setChatData(items)
      setLoading(false)
    })
  }

  useEffect(() => {
    getChat()
    // eslint-disable-next-line
  }, [])

  // ADD FUNCTION
  function createNewChat(item) {
    ref
      //.doc() use if for some reason you want that firestore generates the id
      .doc(item.id)
      .set(item)
      .catch(err => {
        console.error(err)
      })
  }

  // EDIT FUNCTION
  function addChat(item) {
    setLoading()
    ref
      .doc(item.id)
      .update(item)
      .catch(err => {
        console.error(err)
      })
  }
  return (
    <GetChats.Provider value={[chatData, setChatData]}>
      <CreateNewChat.Provider value={createNewChat}>
        <AddChat.Provider value={addChat}>{children}</AddChat.Provider>
      </CreateNewChat.Provider>
    </GetChats.Provider>
  )
}

export default FiretoreContext
