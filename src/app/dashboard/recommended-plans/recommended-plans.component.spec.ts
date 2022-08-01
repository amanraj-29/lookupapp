import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedPlansComponent } from './recommended-plans.component';

describe('RecommendedPlansComponent', () => {
  let component: RecommendedPlansComponent;
  let fixture: ComponentFixture<RecommendedPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendedPlansComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendedPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
