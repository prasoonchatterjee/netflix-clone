import React from "react";
import { render } from "@testing-library/react";
import { Form } from "../../components";

jest.mock("react-router-dom");

describe("<Form />", () => {
  test("renders <Form /> with populated data", () => {
    const { container, getByText, getByPlaceholderText } = render(
      <Form>
        <Form.Title>Sign In Now</Form.Title>
        <Form.Base>
          <Form.Input placeholder="Email Address" onChange={() => {}} />
          <Form.Input
            placeholder="Password"
            onChange={() => {}}
            type="password"
          />
          <Form.Submit type="submit" disabled>
            Sign In
          </Form.Submit>
        </Form.Base>
        <Form.Text>
          New to Netflix?
          {/* <Form.Link to="/signup">Sign up now.</Form.Link> */}
        </Form.Text>
        <Form.TextSmall>
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
          Learn more.
        </Form.TextSmall>
      </Form>
    );

    expect(
      getByText(
        "This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more."
      )
    ).toBeTruthy();
    expect(getByText("Sign In Now")).toBeTruthy();
    expect(getByText("Sign In")).toBeTruthy();
    expect(getByText("Sign In").disabled).toBeTruthy();
    expect(getByText("New to Netflix?")).toBeTruthy();
    expect(getByPlaceholderText("Email Address")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("renders <Form /> with an error", () => {
    const { container, getByText, queryByText } = render(
      <Form>
        <Form.Error>Your email address is already being used</Form.Error>
        <Form.Submit type="submit">Sign In</Form.Submit>
      </Form>
    );

    expect(getByText("Your email address is already being used")).toBeTruthy();
    expect(queryByText("Sign In").disabled).toBeFalsy();
    expect(container.firstChild).toMatchSnapshot();
  });
});
