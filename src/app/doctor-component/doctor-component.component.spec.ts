import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorComponentComponent } from './doctor-component.component';

describe('DoctorComponentComponent', () => {
  let component: DoctorComponentComponent;
  let fixture: ComponentFixture<DoctorComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
