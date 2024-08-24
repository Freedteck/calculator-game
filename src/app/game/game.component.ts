import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { NgxSemanticModule } from 'ngx-semantic';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [NgxSemanticModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit {
  firstNumber!: number;
  secondNumber!: number;
  operator: string = '+';

  ngOnInit(): void {
    this.generateNewNumbers();
  }

  generateNewNumbers(): void {
    this.firstNumber = this.gameService.generateRandomNumber();
    this.secondNumber = this.gameService.generateRandomNumber();
  }

  constructor(private gameService: GameService) {}
}
