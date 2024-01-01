import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsiteHomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: FieldsiteHomeComponent;
  let fixture: ComponentFixture<FieldsiteHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldsiteHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FieldsiteHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
