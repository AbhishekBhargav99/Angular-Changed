import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/admin-component/admin.service';
import { DoctorService } from '../doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addmedicalrecord',
  templateUrl: './addmedicalrecord.component.html',
  styleUrls: ['./addmedicalrecord.component.css']
})
export class AddmedicalrecordComponent implements OnInit {

  patientId: string;
  doctorId: string;
  hospitalId: string;
  medForm: FormGroup;
  startDate : any;
  @ViewChild('form') form: any;
  

  constructor(private formBuilder : FormBuilder, 
    private route: ActivatedRoute,
    private doctorService : DoctorService,
    private router : Router) 
    { 
    this.patientId = "";
    this.doctorId = "";
    this.hospitalId = "";
    this.medForm = this.formBuilder.group({});
    let today = new Date();
    let month = today.getMonth(); //next month
    let year = today.getUTCFullYear();
    let day = today.getDay();

  this.startDate = new Date(year, month, day);

  }

  ngOnInit(): void {

    this.route.parent?.params
                    .subscribe(
                      params => {
                        this.hospitalId = params["hospId"];
                        this.doctorId = params['doctorId'];
                      }
                    )
    this.route.params
                    .subscribe(
                      params => {
                        this.patientId = params['patientId'];
                      }
                    )
        // console.log(this.patientId, this.hospitalId, this.doctorId)
        // {value: this.patientId, disabled: true}
    this.medForm = this.formBuilder.group({
      patientId : new FormControl(this.patientId, Validators.required),
      reasonsForVisit : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      allergies : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
      symptoms : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
      diagnosis : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
      treatment : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
      medication : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]),
      followUp : new FormControl(new Date(), [ Validators.required]),
      notes : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]),
    });
  }

  createMedForm(){
    let form = {
      patientId : this.medForm.value.patientId,
      reasonsForVisit: this.medForm.value.reasonsForVisit,
      allergies: this.medForm.value.allergies,
      symptoms: this.medForm.value.symptoms,
      diagnosis: this.medForm.value.diagnosis,
      treatment: this.medForm.value.treatment,
      medication: this.medForm.value.medication,
      followUp: this.medForm.value.followUp.toDateString(),
      notes: this.medForm.value.notes
    }
    return form;
  }

  onSubmit(){
    
    let newMedForm = this.createMedForm();
    this.doctorService.addMedicalRecords(this.patientId,
       this.doctorId, this.hospitalId, newMedForm)
       .subscribe(
         (res: any) => { console.log(res);
            if(res.status === true){
              Swal.fire({
                title: "Successfully Added medical Records",
                text: `Of Patient : ${this.patientId}, By Doctor : ${this.doctorId}`,
                icon:'success',
                confirmButtonText: 'Ok',
              }).then(
                (result) => {
                  if (result.isConfirmed){
                    this.clearForm();
                  }
                }
              )
            }  
        },
         (err: any) => { console.log(err);
          Swal.fire({
            title: "Could Not Add Patient Records",
            icon: 'error'
          })
        }
       )
    this.form.resetForm();
  }

  clearForm(){
    // this.medForm.reset();
    this.form.resetForm();
    this.medForm.controls['patientId'].setValue(this.patientId);
  }

  backToPatients(){
    this.router.navigate(['doctor', this.hospitalId, this.doctorId, 'viewPatients']);
    console.log("HI");
  }

}
