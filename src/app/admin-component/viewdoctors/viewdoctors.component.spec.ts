import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdoctorsComponent } from './viewdoctors.component';

describe('ViewdoctorsComponent', () => {
  let component: ViewdoctorsComponent;
  let fixture: ComponentFixture<ViewdoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewdoctorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
