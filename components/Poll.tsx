import * as React from 'react';
import styled from 'styled-components';
import { QandAsDocument, QandA, Answer } from '../types';
import { getRandomNumber } from '../utils';

type Props = {
  qandas: QandAsDocument /* q and a's -- questions and answers document */;
};

const PollWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 340px;
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 25px;
`;
const Heading = styled.h3`
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
`;

const VotesWrapper = styled.div``;

const VoteItem = styled.button`
  background: white;
  padding: 10px 15px;
  width: 100%;
  border: 1px solid #e3e3e3;
  border-radius: 10px;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export default function Poll({ qandas }: Props) {
  const [currentQn, setCurrentQn] = React.useState<QandA>();

  React.useEffect(() => {
    const randomInt = getRandomNumber(3);
    setCurrentQn(qandas.questions[randomInt]);
  }, []);

  return (
    <PollWrapper>
      <Heading>{currentQn && currentQn.question.text}</Heading>
      <VotesWrapper>
        {currentQn &&
          currentQn.answers.map((answer: Answer) => (
            <VoteItem key={answer.text}>
              <span>{answer.text}</span>
              <span>{answer.votes}</span>
            </VoteItem>
          ))}
      </VotesWrapper>
    </PollWrapper>
  );
}
