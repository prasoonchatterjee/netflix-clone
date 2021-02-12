import React from "react";
import { render, fireEvent } from "@testing-library/react";
import faqsData from "../../fixtures/faqs.json";
import { Accordion } from "../../components";

describe("<Accordion />", () => {
  test("renders <Accordion /> with populated data", () => {
    const { container, queryByText } = render(
      <Accordion>
        <Accordion.Title>Frequently Asked Questions</Accordion.Title>
        <Accordion.Frame>
          {faqsData.map((item) => (
            <Accordion.Item key={item.id}>
              <Accordion.Header>{item.header}</Accordion.Header>
              <Accordion.Body>{item.body}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion.Frame>
      </Accordion>
    );

    expect(queryByText("Frequently Asked Questions")).toBeTruthy();
    expect(queryByText("What is Netflix?")).toBeTruthy();
    expect(queryByText("How much does Netflix cost?")).toBeTruthy();
    expect(queryByText("Where can I watch?")).toBeTruthy();
    expect(queryByText("How do I cancel?")).toBeTruthy();
    expect(queryByText("What can I watch on Netflix?")).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  test("opens and closes the <Accordion/> component", () => {
    const { container, queryByText } = render(
      <Accordion>
        <Accordion.Title>Frequently Asked Questions</Accordion.Title>
        <Accordion.Frame>
          {faqsData.map((item) => (
            <Accordion.Item key={item.id}>
              <Accordion.Header>{item.header}</Accordion.Header>
              <Accordion.Body>{item.body}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion.Frame>
      </Accordion>
    );

    const whatIsNetflixBody =
      "Netflix is a streaming service that offers a wide variety of award-winning TV programmes, films, anime, documentaries and more – on thousands of internet-connected devices.\n\nYou can watch as much as you want, whenever you want, without a single advert – all for one low monthly price. There's always something new to discover, and new TV programmes and films are added every week!";

    expect(queryByText(whatIsNetflixBody)).toBeFalsy();
    fireEvent.click(queryByText("What is Netflix?"));
    expect(queryByText(whatIsNetflixBody)).toBeTruthy();
    fireEvent.click(queryByText("What is Netflix?"));
    expect(queryByText(whatIsNetflixBody)).toBeFalsy();
    expect(container.firstChild).toMatchSnapshot();
  });
});
