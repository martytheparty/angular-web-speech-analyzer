import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinuousResultItemComponent } from './continuous-result-item.component';

describe('ContinuousResultItemComponent', () => {
  let component: ContinuousResultItemComponent;
  let fixture: ComponentFixture<ContinuousResultItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContinuousResultItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContinuousResultItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
