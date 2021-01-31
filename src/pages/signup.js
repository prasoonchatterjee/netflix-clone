import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { FooterContainer, HeaderContainer } from "../containers";
import { Form } from "../components";
import * as ROUTES from "../constants/routes";
import { FirebaseContext } from "../context/firebase";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();

  const isInValid = firstName === "" || password === "" || emailAddress === "";

  function handleSignUp(event) {
    event.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(emailAddress, password)
      .then((result) => {
        result.user
          .updateProfile({
            displayName: firstName,
            photoURL: Math.floor(Math.random() * 5) + 1,
          })
          .then(() => {
            history.push(ROUTES.BROWSE);
          });
      })
      .catch((error) => {
        setFirstName("");
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      });
  }
  return (
    <>
      <HeaderContainer>
        <Form>
          <Form.Title>Sign Up</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}

          <Form.Base onSubmit={handleSignUp} method="POST">
            <Form.Input
              placeholder="First Name"
              value={firstName}
              onChange={({ target }) => setFirstName(target.value)}
            />
            <Form.Input
              placeholder="Email Address"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <Form.Input
              placeholder="Password"
              type="password"
              autocomplete="off"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Form.Submit disabled={isInValid} type="submit">
              Sign Up
            </Form.Submit>
            <Form.Text>
              Already a user?{" "}
              <Form.Link to={ROUTES.SIGN_IN}>Sign in now.</Form.Link>
            </Form.Text>
            <Form.TextSmall>
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot. Learn more
            </Form.TextSmall>
          </Form.Base>
        </Form>
      </HeaderContainer>
      <FooterContainer />
    </>
  );
}

export default Signup;
