import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addpatient',
  templateUrl: './addpatient.component.html',
  styleUrls: ['./addpatient.component.css']
})
export class AddpatientComponent  {

  public adminId: string;
  public hospitalId: string;
  public newPatientForm : FormGroup;
  public bloodGroups : any;
  public genders: any;
  private sub ?: Subscription;
  public dob ?: Date;
  date = new FormControl(new Date());
  isLoading: boolean;
  @ViewChild('form') form: any;
 

  constructor(private formBuilder : FormBuilder,
    private adminService : AdminService, 
    private route: ActivatedRoute,
    private router: Router) {
      
      this.newPatientForm = this.formBuilder.group({});
      this.bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
      this.genders = [ {id: 'M', value: "Male"}, {id: 'F', value: "Female"}, {id: 'O', value: "Others"}];
      this.adminId ="";
      this.hospitalId = "";
      this.isLoading = false;
    

   }

  ngOnInit(): void {
    
    this.newPatientForm = this.formBuilder.group({
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

    this.sub = this.route.parent?.params
                    .subscribe(
                      params => {
                        this.adminId = params['adminId'];
                        this.hospitalId = params["hospId"]
                      }
                    )
              // console.log(this.adminId, this.hospitalId);
  }

  getDate() {
    let isoString = this.newPatientForm.get('age')?.value.toISOString();
    return isoString.split('T')[0];

  }
  createPatient(){
    let newPatient = {
      firstName: this.newPatientForm.value.firstName,
      lastName : this.newPatientForm.value.lastName ,
      email : this.newPatientForm.value.email ,
      phoneNumber : this.newPatientForm.value.phoneNumber ,
      address : this.newPatientForm.value.address ,
      bloodGroup : this.newPatientForm.value.bloodGroup ,
      age : this.newPatientForm.value.age.toDateString(),
      gender: this.newPatientForm.value.gender,
      weight: this.newPatientForm.value.weight

    }
    return newPatient;
  }

  myFilter = (d: Date | null): boolean => {
    
  
    const day = (d || new Date()).getDay();
    const month = (d || new Date()).getMonth();
    const year = (d || new Date()).getFullYear();
    // months start from 0 to 11
    // Prevent Saturday and Sunday from being selected.
    if(year == 2022){
      if(month <= 1) return true;
      else return false;
    }
    return year <= 2021
  };


  onSubmit(){
    
    
    let newPatient = this.createPatient();
    this.form?.resetForm();
    this.isLoading = true;
    this.adminService.registerPatient(this.adminId, this.hospitalId, newPatient)
      .subscribe(
        (res : any) => {
          // console.log("Response : ", res);
          if(res.status === true){
            Swal.fire({
              title: "Patient Id : " + res.patientId,
              text: "Temporary Password : " + res.password,
              confirmButtonText: 'Ok',
              icon: 'info' 
            }).then(
              (result) => {
                if (result.isConfirmed){
                  this.onSuccess();
                  this.isLoading = false;
                }
              }
            )
          }
        },
        (err : any ) => {
          console.log("Error : ", err);
        }
      )
  }


  resetForm() {
    this.newPatientForm.controls['firstName'].setValue('');
  }

  clearForm(){
    this.resetForm();
  }
 
  onSuccess(){
    this.router.navigate(['../', 'patients'],  {relativeTo: this.route} )
  }
}
