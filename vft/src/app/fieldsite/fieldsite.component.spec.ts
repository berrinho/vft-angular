import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsiteComponent } from './fieldsite.component';

describe('FieldsiteComponent', () => {
  let component: FieldsiteComponent;
  let fixture: ComponentFixture<FieldsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldsiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FieldsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
