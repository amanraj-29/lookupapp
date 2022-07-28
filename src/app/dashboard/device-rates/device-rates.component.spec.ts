import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceRatesComponent } from './device-rates.component';

describe('DeviceRatesComponent', () => {
  let component: DeviceRatesComponent;
  let fixture: ComponentFixture<DeviceRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceRatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
