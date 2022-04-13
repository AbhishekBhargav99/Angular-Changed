import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmedicalrecordComponent } from './addmedicalrecord.component';

describe('AddmedicalrecordComponent', () => {
  let component: AddmedicalrecordComponent;
  let fixture: ComponentFixture<AddmedicalrecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmedicalrecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmedicalrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
