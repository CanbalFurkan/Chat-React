
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import {useCollectionData} from 'react-firebase-hooks/firestore';



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
    
    <div className="container">

      <section>
        <Chatroom/>
      </section>
     
      


    <form >
   <input class="sent-message"type="text" id="fname" name="fname" value="John"/>
    </form>
    </div>
 
     
    

  );
}



function Chatroom(){
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

return (
<>
<div>
  {messages &&messages.map(msg=> <ChatMessage key={msg.id} message={msg}/>)}

</div>
</>

)

}

function ChatMessage(props){
const{text,createdAt,uid}=props.message;
console.log(createdAt.seconds);
var current_date=new Date(createdAt.seconds*1000);
console.log(current_date);
return (
<div class="imessage">
<p class="from-me">{text}</p>


</div>
)

}





export default App;
