import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewrecordsComponent } from './viewrecords.component';

describe('ViewrecordsComponent', () => {
  let component: ViewrecordsComponent;
  let fixture: ComponentFixture<ViewrecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewrecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewrecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
