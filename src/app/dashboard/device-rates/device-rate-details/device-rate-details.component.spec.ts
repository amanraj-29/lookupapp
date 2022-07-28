import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceRateDetailsComponent } from './device-rate-details.component';

describe('DeviceRateDetailsComponent', () => {
  let component: DeviceRateDetailsComponent;
  let fixture: ComponentFixture<DeviceRateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceRateDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceRateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
