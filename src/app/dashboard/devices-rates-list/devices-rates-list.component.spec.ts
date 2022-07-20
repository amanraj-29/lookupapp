import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesRatesListComponent } from './devices-rates-list.component';

describe('DevicesRatesListComponent', () => {
  let component: DevicesRatesListComponent;
  let fixture: ComponentFixture<DevicesRatesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicesRatesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevicesRatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
