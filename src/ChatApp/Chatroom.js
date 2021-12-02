
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import './Chatroom.css'



firebase.initializeApp({
  apiKey: "AIzaSyBtsRE9icKqpXs_nBOB7yagXGjSusl7nGs",
  authDomain: "react-chat-2990a.firebaseapp.com",
  projectId: "react-chat-2990a",
  storageBucket: "react-chat-2990a.appspot.com",
  messagingSenderId: "143681431171",
  appId: "1:143681431171:web:7986ec5c5f3ed569845db6",
  measurementId: "G-DRBSGBZQLF"

})
const auth = firebase.auth();
const firestore = firebase.firestore();


function Chatroom() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  const { uid, photoURL } = auth.currentUser;
  


  const friends = firestore.collection('friends');
 const [frlist]=useCollectionData(friends, { idField: 'id' });



 





  const [messages] = useCollectionData(query, { idField: 'id' });
  

  const [message_text, set_message] = useState("");
  const sendMessage = async (e) => {
    await messagesRef.add({
      text: message_text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL

    })



  }



  return (
    <>
      <div class="main-container">
        <div class="side-container">

          <div class="profile-section">
            <img class={`${photoURL} profile-pic`} src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
            <span class="profile-name">{auth.currentUser.displayName}</span>
          </div>
          <div>

          </div>
          <div >
            <span class="uid"  > {auth.currentUser.uid}</span>
          </div>

       
        </div>




        <div class="right-container">
        <div className="container">
          <div>
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

          </div>

        </div>
        <div class="chatbox" >
          <input value={message_text} onChange={(e) => set_message(e.target.value)} class="form-control" />
          <button class="btn btn-default" type="button" onClick={sendMessage} >SEND</button>


        </div>
        </div>
      </div>
    </>

  )

}
function FriendList(props){
  const { friend } = props.message;
 console.log("sdfd")

 


}

function ChatMessage(props) {
  const { text, createdAt, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'me' : 'them';

  
  return (
    <div class="imessage">
      <img class={`from-${messageClass}`} src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p className={`from-${messageClass}`}>{text}</p>


    </div>
  )

}

export default Chatroom
