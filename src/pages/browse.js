import React from "react";

import { useContent } from "../hooks";
import { selectionFilter } from "../utils";
import { BrowseContainer } from "../containers";

function Browse() {
  const { films } = useContent("films");
  const { series } = useContent("series");
  const slides = selectionFilter({ series, films });

  return <BrowseContainer slides={slides} />;
}

export default Browse;
