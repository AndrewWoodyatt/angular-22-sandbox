import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SessionHistory } from './session-history';

describe('SessionHistory', () => {
  let component: SessionHistory;
  let fixture: ComponentFixture<SessionHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionHistory],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SessionHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
