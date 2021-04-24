import React, { useState, useEffect } from 'react'
import firebase from '../firebase/config'
import { Firebase } from '../firebase/config'
export const GetChats = React.createContext()
export const CreateNewChat = React.createContext()
export const AddChat = React.createContext()

const FiretoreContext = ({ children }) => {
  const [chatData, setChatData] = useState([])

  const ref = firebase.firestore().collection('chats')
  //REALTIME GET FUNCTION
  function getChat() {
    ref.onSnapshot(querySnapshot => {
      const items = []
      querySnapshot.forEach(doc => {
        items.push(doc.data())
      })
      setChatData(items)
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
      .then(() => {
        console.log('Successfully created a chat')
      })
      .catch(err => {
        console.error(err)
      })
  }

  // EDIT FUNCTION
  function addChat(item, docId) {
    console.log(item)

    ref
      .doc(docId)
      // I got stuck with this.
      // solution is to export Firebase from the config
      .update('chats', Firebase.firestore.FieldValue.arrayUnion(item))
      .then(() => {
        console.log('Message successfully sent!')
      })
      .catch(err => {
        console.log(err)
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
