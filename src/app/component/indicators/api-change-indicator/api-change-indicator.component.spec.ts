import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiChangeIndicatorComponent } from './api-change-indicator.component';

describe('ApiChangeIndicatorComponent', () => {
  let component: ApiChangeIndicatorComponent;
  let fixture: ComponentFixture<ApiChangeIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiChangeIndicatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiChangeIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
