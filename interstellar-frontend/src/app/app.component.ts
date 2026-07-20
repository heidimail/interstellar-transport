import { Component, signal } from '@angular/core';
import { Planets } from './planets/planets.component';
import { Header } from './header/header.component';

@Component({
  selector: 'app-root',
  imports: [Planets, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true
})
export class App {
  protected readonly title = signal('Interstellar Travel');
}
