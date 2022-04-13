import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecorddetailsComponent } from './recorddetails.component';

describe('RecorddetailsComponent', () => {
  let component: RecorddetailsComponent;
  let fixture: ComponentFixture<RecorddetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecorddetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecorddetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
