import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscreteResultComponent } from './discrete-result.component';

describe('DiscreteResultComponent', () => {
  let component: DiscreteResultComponent;
  let fixture: ComponentFixture<DiscreteResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscreteResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscreteResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
