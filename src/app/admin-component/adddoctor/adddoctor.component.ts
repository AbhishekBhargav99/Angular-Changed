import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adddoctor',
  templateUrl: './adddoctor.component.html',
  styleUrls: ['./adddoctor.component.css']
})
export class AdddoctorComponent implements OnInit {
  
  public adminId: string;
  public hospitalId: string;
  private sub ?: Subscription;
  public newDoctorForm: FormGroup;
  public specialities : any;
  @ViewChild('form') form: any;

  constructor(private formBuilder : FormBuilder,
    private adminService : AdminService, 
    private route: ActivatedRoute,
    private router: Router) {
      this.adminId ="";
      this.hospitalId = "";
      this.newDoctorForm = this.formBuilder.group({});
      this.specialities = ["Cardiology", "Dental", "Dermatology", "Neurology",
                            "Pathology",  "ENT", "Ophthalmology", "Psychiatry"
                          ] ;
    }

  ngOnInit(): void {


    this.newDoctorForm = this.formBuilder.group({
      userId :  new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]),
      firstName : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]),
      lastName : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]),
      email : new FormControl('', [Validators.required, Validators.email]),
      speciality : new FormControl('', Validators.required),
    })

    this.sub = this.route.parent?.params
    .subscribe(
      params => {
        this.adminId = params['adminId'];
        this.hospitalId = params["hospId"]
      }
    )

  }

  createDoctor(){
    let newDoctor = {
      userId: this.newDoctorForm.value.userId,
      firstName: this.newDoctorForm.value.firstName,
      lastName : this.newDoctorForm.value.lastName ,
      email : this.newDoctorForm.value.email ,
      speciality : this.newDoctorForm.value.speciality 

    }
    return newDoctor;
  }

  onSubmit(){
    let newDoctor = this.createDoctor();
    this.form?.resetForm();
    console.log(newDoctor);
    this.adminService.registerDoctor(this.adminId, this.hospitalId, newDoctor)
    .subscribe(
      (res : any) => {
        console.log("Response : ", res);
        Swal.fire({
          title: "Doctor Id : " + res.doctorId,
          text: "Temporary Password : " + res.password,
          confirmButtonText: 'Ok',
          icon: 'info' 
        }).then(
          (result) => {
            if (result.isConfirmed){
              this.onSuccess();
            }
          }
        )
      },
      (err : any ) => {
        if(err.status === 409){
          Swal.fire({
            title: "User Id already Present",
            icon: 'error',
          })
        }
      }
    )
  }

  onSuccess(){
    this.router.navigate(['../', 'doctors'],  {relativeTo: this.route} )
  }

  clearForm(){
    this.newDoctorForm.reset();
  }

}
