import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-viewpatientspermissioned',
  templateUrl: './viewpatientspermissioned.component.html',
  styleUrls: ['./viewpatientspermissioned.component.css']
})
export class ViewpatientspermissionedComponent implements OnInit {

  doctorId: string;
  hospitalId: string;
  private sub ?: Subscription;
  displayedColumns: string[] = ['patientId', 'firstName', 'lastName', 'age', 'bloodGroup', 'gender', 'weight', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute, 
    private doctorService: DoctorService,
    private router: Router){
      
      this.doctorId = "";
      this.hospitalId = "";
  }

  ngOnInit(): void {
    this.sub = this.route.parent?.params
    .subscribe(
      params => {
        this.hospitalId = params['hospId'];
        this.doctorId = params["doctorId"]
        this.refresh();
      }
    )
  }

  public refresh() : void{

    this.doctorService.getPatients( this.doctorId, this.hospitalId,)
    .subscribe(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    error => {
      console.log("error : ",error);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addRecord(patientId : string){
    // console.log("Patient Id : ", patientId);
    this.router.navigate(['..', 'addRec', patientId], {relativeTo: this.route});
  }

  viewPermissionedRecords(patientId: string){
    this.router.navigate(['..', 'viewRecords', patientId], {relativeTo: this.route});
  }

}
