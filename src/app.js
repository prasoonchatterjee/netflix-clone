import React from 'react'
import { FaqsContainer } from './containers/faqs';
import {FooterContainer} from './containers/footer';
import { JumbotronContainer } from './containers/jumbotron';

function App() {
  return (
    <>
    <JumbotronContainer/>
    <FooterContainer/>
    <FaqsContainer/>
    </>
    );
}

export default App;
