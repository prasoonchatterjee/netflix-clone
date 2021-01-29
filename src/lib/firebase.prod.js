import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAqYo4RvwmiqEqI2-GfWsrVueVtbh3zVK0",
  authDomain: "netflix-clone-d1aa9.firebaseapp.com",
  projectId: "netflix-clone-d1aa9",
  storageBucket: "netflix-clone-d1aa9.appspot.com",
  messagingSenderId: "258892481827",
  appId: "1:258892481827:web:ab5421f66d150f0d10f896",
};

const firebase = Firebase.initializeApp(config);
export { firebase };
