import React from "react";
import { render, fireEvent , act, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Signup } from "../../pages";
import { FirebaseContext } from "../../context/firebase";

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));




describe("<SignUp />", () => {
  it("renders the sign up page with a form submission", async () => {
    const succeedToSignUp = jest.fn(() => Promise.resolve("I am signed up!"));
    const firebase = {
    auth: jest.fn(() => ({
      createUserWithEmailAndPassword: jest.fn(() =>
        Promise.resolve({
          user: {
            updateProfile: succeedToSignUp
          },
        })
      ),
  })),
};

    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <Signup />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      await fireEvent.change(getByPlaceholderText("First Name"), {
        target: { value: "prasoon" },
      });
      await fireEvent.change(getByPlaceholderText("Email Address"), {
        target: { value: "prasoon@gmail.com" },
      });
      await fireEvent.change(getByPlaceholderText("Password"), {
        target: { value: "password" },
      });
      fireEvent.click(getByTestId("sign-up"));

      
      await waitFor(()=>{
      expect(getByPlaceholderText('First Name').value).toBe('prasoon')
      expect(getByPlaceholderText("Email Address").value).toBe("prasoon@gmail.com")
      expect(getByPlaceholderText("Password").value).toBe("password");
      expect(queryByTestId("error")).toBeFalsy();
      expect(succeedToSignUp).toHaveBeenCalled()
      })
    });
  });

  

  it('renders the sign up page but an error is present (email already exists)', async () => {
    const firebase = {
      auth: jest.fn(() => ({
        createUserWithEmailAndPassword: jest.fn(() => Promise.reject(new Error('Email already exists')))
      }))
    };

    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <Signup />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {

      await fireEvent.change(getByPlaceholderText('First Name'), {
        target: { value: 'prasoon' }
      });
      await fireEvent.change(getByPlaceholderText('Email Address'), {
        target: { value: 'prasoon@gmail.com' }
      });
      await fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password' } });
      fireEvent.submit(getByTestId('sign-up'));


      await waitFor(() => {
        expect(mockHistoryPush).not.toHaveBeenCalled();
        expect(getByPlaceholderText('First Name').value).toBe('');
        expect(getByPlaceholderText('Email Address').value).toBe('');
        expect(getByPlaceholderText('Password').value).toBe('');
        expect(queryByTestId('error')).toBeTruthy();
      });
    });
  });
});
