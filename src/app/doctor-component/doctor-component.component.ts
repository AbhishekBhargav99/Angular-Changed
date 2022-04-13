import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AdminService } from '../admin-component/admin.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-doctor-component',
  templateUrl: './doctor-component.component.html',
  styleUrls: ['./doctor-component.component.css']
})
export class DoctorComponentComponent implements OnInit {

  public doctorId: string;
  public hospitalId: string;

  constructor(private route: ActivatedRoute, 
    private adminService: AdminService,
    private authservice: AuthService) { 
      this.doctorId ="";
      this.hospitalId= "";
    }

  ngOnInit(): void {
    this.route.params
        .subscribe((params: Params) => {
          this.doctorId = params['doctorId'];
          this.hospitalId = params["hospId"]
        });
  }

  removeUser(){
    this.authservice.removeUser();
  }

}
