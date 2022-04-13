import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-recorddetails',
  templateUrl: './recorddetails.component.html',
  styleUrls: ['./recorddetails.component.css']
})
export class RecorddetailsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public medRecord : any,
    private dialogRef :MatDialogRef<RecorddetailsComponent>
  ) { }

  public convertToDate(val: any): string{
    return new Date(val.seconds.low * 1000).toDateString();
  }

  ngOnInit(): void {
    console.log('mre : ', this.medRecord);
  }

}
