/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../context/firebase";

/* takes the logged in user from local storage and returns the user */
export default function useAuthListener() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const { firebase } = useContext(FirebaseContext);

  /*onAuthStateChanged will get the signed in user from auth object and if present will store in localstorage or else clear it*/
  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });
    return () => listener();
  }, []);

  return { user };
}
