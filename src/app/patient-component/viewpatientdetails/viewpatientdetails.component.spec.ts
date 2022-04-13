import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpatientdetailsComponent } from './viewpatientdetails.component';

describe('ViewpatientdetailsComponent', () => {
  let component: ViewpatientdetailsComponent;
  let fixture: ComponentFixture<ViewpatientdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewpatientdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpatientdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
