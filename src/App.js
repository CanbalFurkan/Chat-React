
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
<div class="">
  <input value={message_text} onChange={(e)=>set_message(e.target.value)} class="form-control"/>
  <button class="btn btn-default" type="button" onClick={sendMessage} >SEND</button>

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
