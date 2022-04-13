import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpatientspermissionedComponent } from './viewpatientspermissioned.component';

describe('ViewpatientspermissionedComponent', () => {
  let component: ViewpatientspermissionedComponent;
  let fixture: ComponentFixture<ViewpatientspermissionedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewpatientspermissionedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpatientspermissionedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
