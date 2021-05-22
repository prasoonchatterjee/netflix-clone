import React from "react";
import { Feature } from "../components";

export default function FeatureContainer({ children, ...restProps }) {
  return (
    <Feature {...restProps}>
      <Feature.Title>Unlimited films, TV programmes and more.</Feature.Title>
      <Feature.SubTitle>Watch anywhere. Cancel at any time.</Feature.SubTitle>
      {children}
    </Feature>
  );
}
