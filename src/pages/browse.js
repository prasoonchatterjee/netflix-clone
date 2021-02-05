import React from "react";

import { useContent } from "../hooks";

function Browse() {
  const { films } = useContent("films");
  const { series } = useContent("series");
  return <p>hello from Browse</p>;
}

export default Browse;
