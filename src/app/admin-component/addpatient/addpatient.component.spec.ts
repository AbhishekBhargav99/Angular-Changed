import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpatientComponent } from './addpatient.component';

describe('AddpatientComponent', () => {
  let component: AddpatientComponent;
  let fixture: ComponentFixture<AddpatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
