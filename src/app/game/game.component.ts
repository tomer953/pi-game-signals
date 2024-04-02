import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  effect,
  HostListener,
} from '@angular/core';
import { GameRulesComponent } from './game-rules/game-rules.component';
import { PI_STR } from './pi';
import { Rank } from './rank.enum';

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, GameRulesComponent],
})
export class GameComponent {
  Rank = Rank;
  isActive = signal(false);
  i = signal(0);
  currDigit = computed(() => PI_STR[this.i() + 2]);
  errorDigit = signal<string | null>(null);
  input = signal('');
  isError = computed(() => this.errorDigit() !== null);
  pointsPerDigits = signal(1);
  score = computed(() => this.pointsPerDigits() * this.input().length);
  bestScore = signal(0);
  bestScoreEffect = effect(
    () => {
      if (this.score() > this.bestScore()) {
        this.bestScore.set(this.score());
      }
    },
    { allowSignalWrites: true }
  );

  rank = computed(() => {
    const score = this.score();
    if (score > 40) {
      return Rank.EXPERT;
    } else if (score > 30) {
      return Rank.ADVANCED;
    } else if (score > 20) {
      return Rank.INTERMIDIATE;
    }
    return Rank.BEGINNER;
  });

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const digit = event.key;

    if (!this.isActive) {
      return;
    }

    // Check if the pressed key is a digit and the next digit of π
    if (event.key >= '0' && event.key <= '9') {
      this.digitPressed(digit);
    }
  }

  digitPressed(digit: string) {
    // if we right
    if (this.currDigit() === digit) {
      this.input.update((input) => input + digit);
      this.i.update((i) => i + 1);
    }
    // set error digit
    else {
      this.errorDigit.set(digit);
      this.stop();
    }
  }

  play() {
    this.errorDigit.set(null);
    this.i.set(0);
    this.input.set('');
    this.isActive.set(true);
  }

  stop() {
    this.isActive.set(false);
  }
}
