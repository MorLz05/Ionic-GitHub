import { Component, OnDestroy, OnInit, output } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  templateUrl: './splash-screen.component.html',
  styleUrl: './splash-screen.component.scss',
})
export class SplashScreenComponent implements OnInit, OnDestroy {
  readonly finished = output<void>();
  readonly letters = ['A', 'A', 'J', 'D', 'e', 'V'];
  private timeoutId?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.timeoutId = setTimeout(() => this.finished.emit(), 5000);
  }

  ngOnDestroy(): void {
    if (this.timeoutId !== undefined) {
      clearTimeout(this.timeoutId);
    }
  }
}
