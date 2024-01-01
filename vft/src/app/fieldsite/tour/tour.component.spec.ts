import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsiteTourComponent as FieldsiteTourComponent } from './tour.component';

describe('TourComponent', () => {
  let component: FieldsiteTourComponent;
  let fixture: ComponentFixture<FieldsiteTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldsiteTourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FieldsiteTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
