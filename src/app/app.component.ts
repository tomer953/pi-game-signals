import { Component } from '@angular/core';
import { AppHeaderComponent } from './app-header/app-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [AppHeaderComponent],
})
export class AppComponent {
  title = 'pi-game';
}
