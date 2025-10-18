import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningIndicatorComponent } from './warning-indicator.component';

describe('WarningIndicatorComponent', () => {
  let component: WarningIndicatorComponent;
  let fixture: ComponentFixture<WarningIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarningIndicatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarningIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
