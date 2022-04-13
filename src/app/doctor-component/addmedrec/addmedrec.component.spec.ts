import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmedrecComponent } from './addmedrec.component';

describe('AddmedrecComponent', () => {
  let component: AddmedrecComponent;
  let fixture: ComponentFixture<AddmedrecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmedrecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmedrecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
