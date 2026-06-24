import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogSession } from './log-session';

describe('LogSession', () => {
  let component: LogSession;
  let fixture: ComponentFixture<LogSession>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogSession],
    }).compileComponents();

    fixture = TestBed.createComponent(LogSession);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
