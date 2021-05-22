import React, { useState, useContext, useEffect } from "react";

import { useContent } from "../hooks";
import { selectionFilter } from "../utils";
import { BrowseContainer, SelectProfileContainer } from "../containers";
import { Loading } from "../components";
import { FirebaseContext } from "../context/firebase";

/* get all the series and films from firestore using useContent pass it to selectionFilter to sort it based on genre and then pass the sorted list to BrowserContainer */
function Browse() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  const { films } = useContent("films");
  const { series } = useContent("series");
  const slides = selectionFilter({ series, films });

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [profile.displayName]);

  /* render SelectProfileContainer for selecting a profile if not selected, once selected render BrowseContainer */
  return profile.displayName ? (
    <>
      {/* once profile is selected do a loading animation and then render BrowseContainer */}
      {loading ? <Loading src={user.photoURL} /> : <Loading.ReleaseBody />}
      <BrowseContainer slides={slides} user={user} />
    </>
  ) : (
    <SelectProfileContainer user={user} setProfile={setProfile} />
  );
}

export default Browse;
