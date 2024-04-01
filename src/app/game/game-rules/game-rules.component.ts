import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-game-rules',
  standalone: true,
  imports: [],
  templateUrl: './game-rules.component.html',
  styleUrls: ['./game-rules.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameRulesComponent {}
