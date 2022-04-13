import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AdminService } from '../admin-component/admin.service';
import { LoaderService } from '../loader/loader.service';
import { AuthService } from '../shared/auth.service';




@Component({
  selector: 'app-admin-component',
  templateUrl: './admin-component.component.html',
  styleUrls: ['./admin-component.component.css']
})


export class AdminComponentComponent implements OnInit {
  

  public adminId: string;
  public hospitalId: string;
  

  constructor(private route: ActivatedRoute, 
    private adminService: AdminService,
    private authservice: AuthService
    ){

      this.adminId = "";
      this.hospitalId = "";
  }

  ngOnInit(): void {
        
        this.route.params
        .subscribe((params: Params) => {
          this.adminId = params['adminId'];
          this.hospitalId = params["hospId"]
        });
  }

  removeUser(){
    this.authservice.removeUser();
  }
 
}



