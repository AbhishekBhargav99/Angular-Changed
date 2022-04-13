import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DoctorRecordsView } from 'src/app/admin-component/utils/doctor-records-view';
import { PatientService } from '../patient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viewalldoctors',
  templateUrl: './viewalldoctors.component.html',
  styleUrls: ['./viewalldoctors.component.css']
})
export class ViewalldoctorsComponent implements OnInit {

  
  public hospitalId: string;
  patientId : string;
  public doctorRecords?: Observable<Array<DoctorRecordsView>>;
  private sub ?: Subscription;
  public permissionedDocs: Array<string>;

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'speciality', 'email', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute, 
    private patientService: PatientService) { 
    this.patientId =""
    this.hospitalId = "";
    this.permissionedDocs= [];
  }

  ngOnInit(): void {
    this.sub = this.route.parent?.params
                    .subscribe(
                      params => {
                        this.hospitalId = params["hospId"],
                        this.patientId = params["patientId"]
                        // console.log(this.hospitalId, this.patientId)
                        this.permissionedDocs =  this.patientService.permissionedArray;
                        this.refresh();
                      }
                    )
  }

  public refresh(){
    this.patientService.getAllDoctors(this.hospitalId)
    .subscribe(
      data => {
        // console.log("Response : ", data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.log("error", error);
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(){
    this.sub?.unsubscribe();
  }

  grant(doctorId: string){
    this.patientService.grantAccessToDoctor(this.patientId, doctorId, this.hospitalId)
      .subscribe(
        (res : any) => {
          this.patientService.permissionedArray = res;
          this.permissionedDocs =  this.patientService.permissionedArray
          Swal.fire({
            title: "Succesfully granted Permission",
            text: `To : ${doctorId}`,
            confirmButtonText: 'Ok',
            icon: 'success' 
          })
        },
        (err : any) => {
          Swal.fire({
            title: err,
            icon: 'error'
          })
          console.log("Error : ", err);
        }
      )
  }

  isIncluded(id: string) : boolean{
    if(this.permissionedDocs.includes(id))
      return true;
    return false;
  }

  revoke(doctorId: string){
    this.patientService.revokeAccessFromDoctor(this.patientId, doctorId, this.hospitalId)
      .subscribe(
        (res : any) => {
          this.patientService.permissionedArray = res;
          this.permissionedDocs =  this.patientService.permissionedArray
          Swal.fire({
            title: "Succesfully revoked Permission",
            text: `From : ${doctorId}`,
            confirmButtonText: 'Ok',
            icon: 'success' 
          })
        },
        (err : any) => {
          console.log("Error : ", err);
        }
      )
  }

}
