
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import Picker from 'emoji-picker-react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Chatroom from './ChatApp/Chatroom'



const auth = firebase.auth();


function App() {

  const [user] = useAuthState(auth);

  return (
    <div class="center" >
    
      {user ? < Chatroom /> : <SignIn />}
      
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
      <button  onClick={signInWithGoogle}>Sign in with Google</button>
      <p color="white">Google ile gir</p>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button  onClick={() => auth.signOut()}>Sign Out</button>
  )
}









export default App;
