import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LogSession } from './log-session';

describe('LogSession', () => {
  let component: LogSession;
  let fixture: ComponentFixture<LogSession>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogSession],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LogSession);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
