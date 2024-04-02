import {
  ChangeDetectionStrategy,
  Component,
  Input,
  computed,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-game-rules',
  standalone: true,
  imports: [],
  templateUrl: './game-rules.component.html',
  styleUrls: ['./game-rules.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameRulesComponent {
  // let convert input to a signal, so we can use computed if needed
  @Input({ required: true, alias: 'points' }) set _points(x: number) {
    this.points.set(x);
  }
  points = signal(1);

  // computed on input
  pointsStr = computed(() => `<<${this.points()}>>}`);
}
