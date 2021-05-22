import React from "react";
import {
  HeaderContainer,
  JumbotronContainer,
  FaqsContainer,
  FooterContainer,
  FeatureContainer,
  OptFormContainer,
} from "../containers";

export default function Home() {
  return (
    <>
      <HeaderContainer>
        <FeatureContainer>
          <OptFormContainer />
        </FeatureContainer>
      </HeaderContainer>
      <JumbotronContainer />
      <FaqsContainer />
      <FooterContainer />
    </>
  );
}
