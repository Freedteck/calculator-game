import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgxSemanticModule } from 'ngx-semantic';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [ReactiveFormsModule, NgxSemanticModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  gameForm!: FormGroup;
  firstNumber!: number;
  secondNumber!: number;
  operator: string = '+';
  correctAttempts = 0;
  incorrectAttempts = 0;
  isSubmitted = false;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameForm = new FormGroup({
      userAnswer: new FormControl('', [
        Validators.required,
        Validators.pattern('^-?\\d+$'),
      ]),
    });
    this.generateNewNumbers();
  }

  generateNewNumbers(): void {
    this.firstNumber = this.gameService.generateRandomNumber();
    this.secondNumber = this.gameService.generateRandomNumber();
    this.gameForm.reset(); // Reset the form controls
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.gameForm.invalid) {
      return; // If form is invalid, don't proceed
    }

    const userAnswerValue = Number(this.gameForm.get('userAnswer')!.value);
    const correctAnswer = this.gameService.calculateCorrectAnswer(
      this.firstNumber,
      this.secondNumber,
      this.operator
    );
    const isCorrect = userAnswerValue === correctAnswer;
    this.gameService.updateScore(isCorrect);
    this.correctAttempts = this.gameService.getScore().correctAttempts;
    this.incorrectAttempts = this.gameService.getScore().incorrectAttempts;
    this.generateNewNumbers();
  }

  isInvalidAnswer(): boolean {
    return this.isSubmitted && this.gameForm.get('userAnswer')!.invalid;
  }
}
