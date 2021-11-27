
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import {useCollectionData} from 'react-firebase-hooks/firestore';
import { useState } from 'react';



firebase.initializeApp({
  apiKey: "AIzaSyBtsRE9icKqpXs_nBOB7yagXGjSusl7nGs",
  authDomain: "react-chat-2990a.firebaseapp.com",
  projectId: "react-chat-2990a",
  storageBucket: "react-chat-2990a.appspot.com",
  messagingSenderId: "143681431171",
  appId: "1:143681431171:web:7986ec5c5f3ed569845db6",
  measurementId: "G-DRBSGBZQLF"

})


const firestore=firebase.firestore();

function App() {



  return (
    <div class="center" >
      <section >
        <Chatroom/>
      </section>
      </div>
        
    
    

  );
}



function Chatroom(){
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [message_text,set_message]=useState("");
  const sendMessage= async(e) => {
    await messagesRef.add({
      text:message_text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),

    })

   

  }

return (
<>
<div>
<div className="container">
<div>
  {messages &&messages.map(msg=> <ChatMessage key={msg.id} message={msg}/>)}

</div>

</div>
<div class="input-group center-block-mes">
  <input value={message_text} onChange={(e)=>set_message(e.target.value)} class="form-control"/>
  <button class="btn btn-outline-secondary" type="button" onClick={sendMessage}>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
  </svg>
  </button>
  </div>
</div>
</>

)

}

function ChatMessage(props){
const{text,createdAt,uid}=props.message;
return (
<div class="imessage">
<p class="from-them">{text}</p>


</div>
)

}





export default App;
