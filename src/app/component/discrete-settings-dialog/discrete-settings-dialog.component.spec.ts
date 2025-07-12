import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscreteSettingsDialogComponent } from './discrete-settings-dialog.component';

describe('DiscreteSettingsDialogComponent', () => {
  let component: DiscreteSettingsDialogComponent;
  let fixture: ComponentFixture<DiscreteSettingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscreteSettingsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscreteSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
