import React from "react";
import { OptFormContainer } from "../containers";
import { Accordion } from "../components";
import faqsData from "../fixtures/faqs.json";

/* it contains all the FAQs within the accordion and the opt in form in the homepage */
export default function FaqsContainer() {
  return (
    <Accordion>
      <Accordion.Title>Frequently Asked Questions</Accordion.Title>
      {faqsData.map((item) => (
        <Accordion.Item key={item.id}>
          <Accordion.Header>{item.header}</Accordion.Header>
          <Accordion.Body>{item.body}</Accordion.Body>
        </Accordion.Item>
      ))}
      <OptFormContainer />
    </Accordion>
  );
}
