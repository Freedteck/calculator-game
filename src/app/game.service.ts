import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  correctAttempts = 0;
  incorrectAttempts = 0;

  generateRandomNumber(max = 50): number {
    return Math.floor(Math.random() * (max + 1));
  }

  checkAnswer(
    num1: number,
    num2: number,
    userAnswer: number,
    operator: string
  ): boolean {
    let correctAnswer: number;
    switch (operator) {
      case '+':
        correctAnswer = num1 + num2;
        break;
      case '-':
        correctAnswer = num1 - num2;
        break;
      case '*':
        correctAnswer = num1 * num2;
        break;
      case '/':
        correctAnswer = num1 / num2;
        break;
      default:
        correctAnswer = num1 + num2;
    }

    const isCorrect = userAnswer === correctAnswer;
    if (isCorrect) {
      this.correctAttempts++;
    } else {
      this.incorrectAttempts++;
    }
    return isCorrect;
  }

  getScore() {
    return {
      correctAttempts: this.correctAttempts,
      incorrectAttempts: this.incorrectAttempts,
    };
  }

  constructor() {}
}
