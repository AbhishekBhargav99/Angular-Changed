import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hidePassword: boolean;
  public signupForm: FormGroup;
  otpReceived: boolean;
  username: string;
  hospitalId: string;
  role: string;
  email: string;


  constructor(private formbuilder : FormBuilder, 
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {
    this.hidePassword = true;
    this.email = "";
    this.otpReceived = false;
    this.username = "";
    this.hospitalId ="";
    this.role =""
    this.signupForm =  this.formbuilder.group({
        role: new FormControl('doctor'),
        username: new FormControl(''),
        hospitalId: new FormControl('0'),
        newPassword: new FormControl(''),
        email: new FormControl(''),
        otp: new FormControl(''),

    })
   }

  ngOnInit(): void {
    this.signupForm =  this.formbuilder.group({
      role: new FormControl('doctor'),
      username: new FormControl('', Validators.required),
      hospitalId: new FormControl('1'),
      newPassword: new FormControl('123', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      otp: new FormControl('1234', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
  })
  this.otpReceived = false;
  }

  createUser(){
    const role = this.signupForm.value.role;
    const hospitalId = this.signupForm.value.hospitalId;
    const username = this.signupForm.value.username;
    const email = this.signupForm.value.email;

    this.role = role;
    this.hospitalId = hospitalId;
    this.username = username;
    this.email = email;

    let signupUser = {
      role: role,
      hospitalId: hospitalId,
      username: username,
      email: email
    };

    return signupUser;
  }

  signup(){
    console.log(this.signupForm.value);
    let signupUser = this.createUser();
    if(!this.otpReceived){
      this.authService.getOtp(this.hospitalId, this.role, signupUser)
      .subscribe(
        (res: any) => {
          Swal.fire({
            title: 'success',
            text: `Message : ${res.message}`,
            icon: 'info',
            confirmButtonText: 'OK',
          })
          this.otpReceived = true;
        },
        (err : any) => {
          
          if(err.status === 400){
            Swal.fire({
              title: 'Enter All the Fields',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          }
          else{
            Swal.fire({
              title: 'Enter CorRect Credentials',
              icon: 'error',
              confirmButtonText: 'OK',
            })

          }
         
        }
      )
    }
    else{
      // username, otp, role, newPassword, hospitalId
      let userData = {
        username: this.username,
        role :this.role,
        newPassword: this.signupForm.value.newPassword,
        otp: this.signupForm.value.otp,
        hospitalId: this.hospitalId
      }
      this.authService.resetPassword(this.hospitalId, this.role, userData)
      .subscribe(
        (res : any) => {
          Swal.fire({
            title: 'success',
            text: `Message:  ${res.message}`,
            icon: 'info',
            confirmButtonText: 'OK',
          })
          this.afterResetPassword();
        },
        (err : any) => {

          if(err.status === 400){
            Swal.fire({
              title: 'Enter All the Fields',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          }
          else{
            Swal.fire({
              title: 'Enter Correct Credentials',
              icon: 'error',
              confirmButtonText: 'OK',
            })

          }


        }
      )
    }
    // this.signupForm.reset()
  }  

  afterResetPassword(){
    this.router.navigate(['..', 'login'],  {relativeTo: this.route} )
  }


  aftergettingOtp(){

  }

}
