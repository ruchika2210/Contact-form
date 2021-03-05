import firebase from 'firebase'


var  firebaseApp=firebase.initializeApp({
  
        apiKey: "AIzaSyCac4rEpgLCnam8XoGU6K1PPJFwrGy1EUo",
        authDomain: "react-form-35037.firebaseapp.com",
        projectId: "react-form-35037",
        storageBucket: "react-form-35037.appspot.com",
        messagingSenderId: "361825193984",
        appId: "1:361825193984:web:087d6ed3b202cc9c4dc8e5"
      
})

var db=firebaseApp.firestore();


export {db}

