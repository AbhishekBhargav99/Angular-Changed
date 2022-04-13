import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-viewpatientdetails',
  templateUrl: './viewpatientdetails.component.html',
  styleUrls: ['./viewpatientdetails.component.css']
})
export class ViewpatientdetailsComponent implements OnInit {

  patientId: string;
  hospitalId: string;
  patientInfo: any;
  patientForm: FormGroup;
  updatePatient: boolean;


  constructor( private formBuilder : FormBuilder,
    private route: ActivatedRoute, 
    private patientService: PatientService,
    // @Inject(MAT_DIALOG_DATA) public patientData: any,
    // private dialogRef : MatDialogRef<ViewpatientdetailsComponent>
    ) { 

      this.patientId = '';
      this.hospitalId = '';
      this.patientInfo = {};
      this.patientForm = this.formBuilder.group({});
      this.updatePatient = false;
  }

  ngOnInit(): void {

    this.route.parent?.params
    .subscribe((params: Params) => {
      this.patientId = params['patientId'];
      this.hospitalId = params["hospId"];
    });

    this.updatePatient = false;
    // this.patientInfo =this.patientData;
    this.refresh();
    // console.log("patientInfo : ", this.patientInfo);
    this.patientForm = this.formBuilder.group({
      patientId: new FormControl(this.patientInfo.patientId),
      firstName : new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      lastName : new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      email : new FormControl('', [Validators.required, Validators.email, Validators.maxLength(25)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$"), Validators.maxLength(10) ]),
      address: new FormControl('', [Validators.required, Validators.minLength(3) , Validators.maxLength(80)]),
      bloodGroup: new FormControl('', Validators.required),
      age : new FormControl(new Date(), [ Validators.required]),
      weight: new FormControl('', [Validators.required]),
      gender: new FormControl('M', Validators.required),
    })
    
  }

  updateForm(patientInfo: any){
    this.updatePatient = false;
    this.patientForm.patchValue({
      patientId: this.patientInfo.patientId,
      firstName : this.patientInfo.firstName, 
      lastName :  this.patientInfo.lastName ,
      email : this.patientInfo.email,
      phoneNumber:  this.patientInfo.phoneNumber,
      address: this.patientInfo.address, 
      bloodGroup: this.patientInfo.bloodGroup,
      age : this.patientInfo.age, 
      weight:  this.patientInfo.weight,
      gender: this.patientInfo.gender,

    })
  }

 
  updatePatientRecords(){
    console.log(this.patientForm.value);
    this.patientInfo = this.patientForm.value;
    this.patientService.updatePersonelDetails(this.patientId, this.hospitalId, this.patientForm.value)
    .subscribe(
      (res : any) => {
        // this.patientInfo = res;
        // this.patientInfo = this.patientForm.value;
        // this.updateForm(this.patientInfo);
        console.log(res);
        this.refresh();
      },
      (err : any) => {console.log(err)}
    )
    // console.log("patient Info : ", this.patientInfo);
  }

  refresh() {
    this.patientService.getPatientDetails(this.patientId, this.hospitalId)
    .subscribe(
      (res : any) => { 
        this.patientInfo = res;
        this.patientService.permissionedArray = res.permissionGranted;
        this.updateForm(this.patientInfo); 
       },
      (err : any) => {console.log("Error : ", err) }
    )
  }


}
