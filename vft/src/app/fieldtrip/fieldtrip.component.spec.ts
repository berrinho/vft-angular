import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldtripComponent } from './fieldtrip.component';

describe('FieldtripComponent', () => {
  let component: FieldtripComponent;
  let fixture: ComponentFixture<FieldtripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldtripComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FieldtripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
