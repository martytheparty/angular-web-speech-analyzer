import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscreteComponent } from './discrete.component';

describe('DiscreteComponent', () => {
  let component: DiscreteComponent;
  let fixture: ComponentFixture<DiscreteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscreteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscreteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
