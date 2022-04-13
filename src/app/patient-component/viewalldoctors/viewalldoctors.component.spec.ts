import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewalldoctorsComponent } from './viewalldoctors.component';

describe('ViewalldoctorsComponent', () => {
  let component: ViewalldoctorsComponent;
  let fixture: ComponentFixture<ViewalldoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewalldoctorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewalldoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
