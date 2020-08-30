import { Answer } from './types';

export function getRandomNumber(to: number) {
  return Math.floor(Math.random() * Math.floor(to));
}

export function getTotal(answers: Answer[]): number {
  let sum = 0;
  answers.forEach((answer) => (sum += answer.votes));
  return sum;
}

export function getPercentage(total: number, value: number) {
  return Math.round((value / total) * 100);
}
