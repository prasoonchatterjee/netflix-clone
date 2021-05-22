import React from "react";
import { render, fireEvent ,waitFor ,act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Signin } from "../../pages";
import { FirebaseContext } from "../../context/firebase";

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));



describe("<SignIn />", () => {
  it("renders the sign in page with a form submission", async () => {
    const succeededToLogin = jest.fn(() => Promise.resolve('I am signed in!'));
    const firebase = {
      auth: jest.fn(() => ({
        signInWithEmailAndPassword: succeededToLogin
      }))
    };
    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <Signin />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      await fireEvent.change(getByPlaceholderText("Email Address"), {
        target: { value: "prasoon@gmail.com" },
      });
      await fireEvent.change(getByPlaceholderText("Password"), {
        target: { value: "password" },
      });
      fireEvent.click(getByTestId("sign-in"));

      expect(getByPlaceholderText("Password").value).toBe("password");
      expect(getByPlaceholderText("Email Address").value).toBe("prasoon@gmail.com");
      expect(queryByTestId("error")).toBeFalsy();
    });

    await waitFor(() => {
        expect(succeededToLogin).toHaveBeenCalled();
        expect(getByPlaceholderText("Email Address").value).toBe("prasoon@gmail.com");
        expect(getByPlaceholderText("Password").value).toBe("password");
        expect(queryByTestId("error")).toBeFalsy();
      });
  });

   it('renders the login in page with a form submission and fails to log a user in', async () => {
    const failToLogin = jest.fn(() => Promise.reject(new Error('Cannot sign in')));
    const firebase = {
      auth: jest.fn(() => ({
        signInWithEmailAndPassword: failToLogin
      }))
    };

    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <Signin />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      await fireEvent.change(getByPlaceholderText('Email Address'), {
        target: { value: 'prasoon@gmail.com' }
      });
      await fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password' } });
      fireEvent.submit(getByTestId('sign-in'));

      expect(failToLogin).toHaveBeenCalled();
      expect(failToLogin).toHaveBeenCalledWith('prasoon@gmail.com', 'password');
      await expect(failToLogin).rejects.toThrow('Cannot sign in');
      
      await waitFor(() => {
        expect(mockHistoryPush).not.toHaveBeenCalled();
        expect(getByPlaceholderText('Email Address').value).toBe('');
        expect(getByPlaceholderText('Password').value).toBe('');
        expect(queryByTestId('error')).toBeTruthy();
      });
    });
  });
});
