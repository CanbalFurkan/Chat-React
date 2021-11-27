
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import Picker from 'emoji-picker-react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';



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
const firestore=firebase.firestore();

function App() {

  const [user] = useAuthState(auth);

  return (
    <div class="center" >
      <section >
      {user ? < Chatroom /> : <SignIn />}
      </section>
      </div>
        
    
    

  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p color="white">Google ile gir</p>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}




function Chatroom(){
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  const { uid, photoURL } = auth.currentUser;

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [message_text,set_message]=useState("");
  const sendMessage= async(e) => {
    await messagesRef.add({
      text:message_text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL

    })

   

  }

  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

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

  {chosenEmoji ? (
        <span>You chose: {chosenEmoji.emoji}</span>
      ) : (
        <span>No emoji Chosen</span>
      )}
      <Picker onEmojiClick={onEmojiClick} />
  </div>
</div>
</>

)

}

function ChatMessage(props){
const{text,createdAt,uid,photoURL}=props.message;
const messageClass = uid === auth.currentUser.uid ? 'me' : 'them';

console.log(messageClass)
return (
  <div class="imessage">
<img class={`from-${messageClass}`}src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
<p className={`from-${messageClass}`}>{text}</p>


</div>
)

}





export default App;
