import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../patient.service';
import { RecorddetailsComponent } from '../recorddetails/recorddetails.component';

@Component({
  selector: 'app-viewrecords',
  templateUrl: './viewrecords.component.html',
  styleUrls: ['./viewrecords.component.css']
})
export class ViewrecordsComponent implements OnInit {

  patientId: string;
  hospitalId: string;
  displayedColumns: string[] = ['sno', 'changedBy', 'timestamp' , 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  constructor(private route: ActivatedRoute, 
    private patientService: PatientService,
    public dialog: MatDialog) {
      this.patientId = '';
      this.hospitalId = '';

    }

  ngOnInit(): void {
    this.route.parent?.params
    .subscribe(
      params => {
        this.hospitalId = params["hospId"],
        this.patientId = params["patientId"]
        console.log("log : ", this.hospitalId, this.patientId)
        this.refresh();
      }
    )
    
  }

  refresh(){
    this.patientService.getPatientMedicalHistory(this.patientId, this.hospitalId)
    .subscribe(
      (response : any) => {
        console.log("Response : ", response)
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      
      },
      (err: any) => {console.log(err)}
    )
  }

  showRecordsDetails(medRecord: any){
    this.dialog.open(RecorddetailsComponent,{
      width: '40%',
      data: medRecord,
    })
    // console.log("medRecords : ", medRecord);

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public convertToDate(val: any): string{
    return new Date(val.seconds.low * 1000).toDateString();
  }

}
