/* eslint-disable react-hooks/exhaustive-deps */

/* retrives collection of movies or series from firebase firestore based on target passed which is either series or films to access their individual collection */
import { useEffect, useContext, useState } from "react";
import { FirebaseContext } from "../context/firebase";

export default function useContent(target) {
  const [content, setContent] = useState([]);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    firebase
      .firestore()
      .collection(target)
      .get()
      .then((snapshot) => {
        const allContent = snapshot.docs.map((contentObj) => ({
          ...contentObj.data(),
          docId: contentObj.id,
        }));
        setContent(allContent);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return { [target]: content };
}
