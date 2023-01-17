import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallAlertsComponent } from './overall-alerts.component';

describe('OverallAlertsComponent', () => {
  let component: OverallAlertsComponent;
  let fixture: ComponentFixture<OverallAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverallAlertsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverallAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
