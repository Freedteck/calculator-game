import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private correctAttempts = 0;
  private incorrectAttempts = 0;

  generateRandomNumber(max = 50): number {
    return Math.floor(Math.random() * (max + 1));
  }

  calculateCorrectAnswer(num1: number, num2: number, operator: string): number {
    switch (operator) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        return num1 / num2;
      default:
        return num1 + num2;
    }
  }

  updateScore(isCorrect: boolean): void {
    if (isCorrect) {
      this.correctAttempts++;
    } else {
      this.incorrectAttempts++;
    }
  }

  getScore() {
    return {
      correctAttempts: this.correctAttempts,
      incorrectAttempts: this.incorrectAttempts,
    };
  }

  constructor() {}
}
