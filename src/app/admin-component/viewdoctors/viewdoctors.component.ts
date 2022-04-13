import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
import { DoctorRecordsView } from '../utils/doctor-records-view';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-viewdoctors',
  templateUrl: './viewdoctors.component.html',
  styleUrls: ['./viewdoctors.component.css']
})
export class ViewdoctorsComponent implements OnInit {

  public adminId: string;
  public hospitalId: string;
  public doctorRecords?: Observable<Array<DoctorRecordsView>>;
  private sub ?: Subscription;

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'speciality', 'email'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute, 
    private adminService: AdminService) { 
    this.adminId = "";
    this.hospitalId = "";
  }

  ngOnInit(): void {
    this.sub = this.route.parent?.params
                    .subscribe(
                      params => {
                        this.adminId = params['adminId'];
                        this.hospitalId = params["hospId"]
                        this.refresh();
                      }
                    )
  }

  public refresh(){
    this.adminService.getAllDoctors(this.adminId, this.hospitalId)
    .subscribe(
      data => {
        console.log("Response : ", data);
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
}
