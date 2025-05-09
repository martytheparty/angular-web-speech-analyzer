import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiIndicatorComponent } from './api-indicator.component';

describe('ApiIndicatorComponent', () => {
  let component: ApiIndicatorComponent;
  let fixture: ComponentFixture<ApiIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiIndicatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
