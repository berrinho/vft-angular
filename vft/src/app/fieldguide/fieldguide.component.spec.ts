import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldguideComponent } from './fieldguide.component';

describe('FieldguideComponent', () => {
  let component: FieldguideComponent;
  let fixture: ComponentFixture<FieldguideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldguideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FieldguideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
