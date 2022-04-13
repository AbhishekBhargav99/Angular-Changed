import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewrecordspermissionedComponent } from './viewrecordspermissioned.component';

describe('ViewrecordspermissionedComponent', () => {
  let component: ViewrecordspermissionedComponent;
  let fixture: ComponentFixture<ViewrecordspermissionedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewrecordspermissionedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewrecordspermissionedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
