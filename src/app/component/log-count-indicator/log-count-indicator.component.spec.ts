import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogCountIndicatorComponent } from './log-count-indicator.component';

describe('LogCountIndicatorComponent', () => {
  let component: LogCountIndicatorComponent;
  let fixture: ComponentFixture<LogCountIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogCountIndicatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogCountIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
