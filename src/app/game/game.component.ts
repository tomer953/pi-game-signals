import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';
import { GameRulesComponent } from './game-rules/game-rules.component';
import { PI_STR } from './pi';

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, GameRulesComponent],
})
export class GameComponent {
  input = '';
  error = false;
  gameStatus: 'active' | 'stopped' = 'stopped';

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const digit = event.key;

    if (this.gameStatus === 'stopped') {
      return;
    }

    // Check if the pressed key is a digit and the next digit of π
    if (event.key >= '0' && event.key <= '9') {
      this.digitPressed(digit);
    }
  }

  digitPressed(digit: string) {
    this.input += digit;
  }

  play() {
    this.error = false;
    this.input = '';
    this.gameStatus = 'active';
  }
}
