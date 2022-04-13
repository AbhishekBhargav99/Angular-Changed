import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { PatientService } from './patient.service';
import { ViewpatientdetailsComponent } from './viewpatientdetails/viewpatientdetails.component';

@Component({
  selector: 'app-patient-component',
  templateUrl: './patient-component.component.html',
  styleUrls: ['./patient-component.component.css']
})
export class PatientComponentComponent implements OnInit {

  patientId : string;
  hospitalId: string;
  patientInfo: any;

  constructor( private route: ActivatedRoute, 
    private patientService: PatientService,
    public dialog: MatDialog, 
    private authservice: AuthService) {
    this.patientId = "";
    this.hospitalId = "";
    this.patientInfo = "";
    
  }

  ngOnInit(): void {
    this.route.params
        .subscribe((params: Params) => {
          this.patientId = params['patientId'];
          this.hospitalId = params["hospId"];
        });
    // this.refresh();
  }

  openDialog(patient : any) {
    this.dialog.open(ViewpatientdetailsComponent, {
     width: '30%',
     data: patient
    });
  }

  refresh() {
    this.patientService.getPatientDetails(this.patientId, this.hospitalId)
    .subscribe(
      (res : any) => { 
        this.patientInfo = res; 
        this.patientService.permissionedArray = this.patientInfo.permissionGranted;
        // this.openDialog(this.patientInfo);
      },
      (err : any) => {console.log("Error : ", err) }
    )
    
  }

  removeUser(){
    this.authservice.removeUser();
  }



}
