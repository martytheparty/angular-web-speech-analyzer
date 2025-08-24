import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinuousResultComponent } from './continuous-result.component';

describe('ContinuousResultComponent', () => {
  let component: ContinuousResultComponent;
  let fixture: ComponentFixture<ContinuousResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContinuousResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContinuousResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
