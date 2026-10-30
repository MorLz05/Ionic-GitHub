import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SplashScreenComponent } from './splash-screen.component';

describe('SplashScreenComponent', () => {
  it('finishes after five seconds', fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [SplashScreenComponent],
    });

    const fixture = TestBed.createComponent(SplashScreenComponent);
    let finished = false;
    fixture.componentInstance.finished.subscribe(() => (finished = true));
    fixture.detectChanges();

    tick(1999);
    expect(finished).toBeFalse();

    tick(1);
    expect(finished).toBeTrue();
    fixture.destroy();
  }));
});
