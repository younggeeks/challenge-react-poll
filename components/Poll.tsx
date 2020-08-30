import * as React from 'react';
import styled from 'styled-components';
import { QandAsDocument, QandA, Answer } from '../types';
import { getRandomNumber, getTotal, getPercentage } from '../utils';
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

  /* Targeting Mobile   */
  @media (max-width: 425px) {
    width: 250px;
  }
`;
const Heading = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 20px 0;
  padding: 0;

  @media (max-width: 425px) {
    font-size: 1.2rem;
  }
`;

const VotesWrapper = styled.div``;

const VoteItem = styled.div<{ max: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 7px 15px;
  cursor: pointer;
  border: 1px solid #e3e3e3;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  font-weight: ${(props) => (props.max ? 'bold' : 'normal')};
  span {
    z-index: 3;
    display: flex;
    align-items: center;
  }
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const CheckMarkImg = styled.img`
  height: 20px;
  margin-left: 10px;
`;

const ProgressContainer = styled.div<{ width: number; max: boolean }>`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 100%;
  width: ${(props) => props.width}%;
  background: ${(props) => (props.max ? 'cyan' : 'rgb(232, 232, 232)')};
`;

export default function Poll({ qandas }: Props) {
  const [currentQn, setCurrentQn] = React.useState<QandA>();
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>();
  const [currentTotal, setCurrentTotal] = React.useState<number | 0>(0);
  const [max, setMax] = React.useState<number | 0>(0);

  React.useEffect(() => {
    const randomInt = getRandomNumber(3);
    const question = qandas.questions[randomInt];
    setCurrentTotal(getTotal(question.answers));
    setMax(Math.max(...question.answers.map((ans) => ans.votes)));
    setCurrentQn(question);
  }, []);

  return (
    <PollWrapper>
      <Heading>{currentQn && currentQn.question.text}</Heading>
      <VotesWrapper>
        {currentQn &&
          currentQn.answers.map((answer: Answer) => (
            <VoteItem
              key={answer.text}
              role="button"
              onClick={() => setSelectedAnswer(answer.text)}
              max={answer.votes === max}
            >
              <ProgressContainer
                width={getPercentage(currentTotal, answer.votes)}
                max={answer.votes === max}
              />

              <span>
                {answer.text}{' '}
                {selectedAnswer === answer.text ? (
                  <CheckMarkImg src={require('../static/check-circle.svg')} />
                ) : (
                  ' '
                )}
              </span>
              <span>{getPercentage(currentTotal, answer.votes)}%</span>
            </VoteItem>
          ))}
      </VotesWrapper>
    </PollWrapper>
  );
}
