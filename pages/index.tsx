import React from 'react';
import styled from 'styled-components';
import GlobalStyles from '../components/GlobalStyles';
import questions from '../questions.json';
import Poll from '../components/Poll';

const IndexPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    align-self: flex-start;

    @media (max-width: 425px) {
      font-size: 1.5rem;
    }
  }
`;

export default () => (
  <IndexPage>
    <GlobalStyles />
    <h1>Decode React Poll Challenge</h1>
    <p>
      Here is some text that is on the page in a paragraph tag. The poll will
      appear within this context below.
    </p>
    <Poll qandas={questions} />
    <p>
      Here is the rest of the text on the page. We just have something down here
      for context to see it in.
    </p>
  </IndexPage>
);

/**
 * TIPS:
 *
 * You can load the check image like this:
 *
 *    <img src={require('../static/check-circle.svg')} />
 *
 */
