import React from "react";

import { useContent } from "../hooks";
import { selectionFilter } from "../utils";

function Browse() {
  const { films } = useContent("films");
  const { series } = useContent("series");
  const slides = selectionFilter({ series, films });
  console.log(slides);

  return <p>hello from Browse</p>;
}

export default Browse;
