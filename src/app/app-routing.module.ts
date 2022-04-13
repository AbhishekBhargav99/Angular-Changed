import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdddoctorComponent } from './admin-component/adddoctor/adddoctor.component';
import { AddpatientComponent } from './admin-component/addpatient/addpatient.component';
import { AdminComponentComponent } from './admin-component/admin-component.component';
import { ViewdoctorsComponent } from './admin-component/viewdoctors/viewdoctors.component';
import { ViewpatientsComponent } from './admin-component/viewpatients/viewpatients.component';
import { AddmedicalrecordComponent } from './doctor-component/addmedicalrecord/addmedicalrecord.component';
import { AddmedrecComponent } from './doctor-component/addmedrec/addmedrec.component';
import { DoctorComponentComponent } from './doctor-component/doctor-component.component';
import { ViewpatientspermissionedComponent } from './doctor-component/viewpatientspermissioned/viewpatientspermissioned.component';
import { ViewrecordspermissionedComponent } from './doctor-component/viewrecordspermissioned/viewrecordspermissioned.component';
import { LoginComponent } from './login/login.component';
import { PatientComponentComponent } from './patient-component/patient-component.component';
import { ViewalldoctorsComponent } from './patient-component/viewalldoctors/viewalldoctors.component';
import { ViewpatientdetailsComponent } from './patient-component/viewpatientdetails/viewpatientdetails.component';
import { ViewrecordsComponent } from './patient-component/viewrecords/viewrecords.component';
import { AdminGuard } from './shared/admin.guard';
import { DoctorGuard } from './shared/doctor.guard';
import { PatientGuard } from './shared/patient.guard';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },{
    path: 'login',
    component: LoginComponent,
  },{
    path: 'signup',
    component: SignupComponent
  },{

    path:'admin/:hospId/:adminId',
    component: AdminComponentComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        redirectTo: 'patients',
        pathMatch: 'full'
      }, {
        path: 'patients',
        component: ViewpatientsComponent,
      }, {
        path: 'doctors',
        component: ViewdoctorsComponent,
      },{
        path: 'addPatient',
        component: AddpatientComponent,
      }, {
        path: 'addDoctor',
        component: AdddoctorComponent,
      }
    ]
  },{
    path: 'patient/:hospId/:patientId',
    component: PatientComponentComponent,
    canActivate: [PatientGuard],
    children:[
      {
        path: '',
        redirectTo: 'viewDetails',
        pathMatch: 'full'
      }, {
        path: 'viewDetails',
        component: ViewpatientdetailsComponent,
        
      }, {
        path: 'viewRecords',
        component: ViewrecordsComponent
      }, {
        path: 'viewDoctors',
        component: ViewalldoctorsComponent
      }
    ]
  }, {
    path : 'doctor/:hospId/:doctorId',
    component: DoctorComponentComponent,
    canActivate: [DoctorGuard],
    children:[
      {
        path: '',
        redirectTo: 'viewPatients',
        pathMatch: 'full'
      }, {
        path: 'addRecord/:patientId',
        component: AddmedicalrecordComponent,
      } , {
        path: 'viewPatients',
        component: ViewpatientspermissionedComponent
      }, {
        path: 'viewRecords/:patientId',
        component: ViewrecordspermissionedComponent
      }, {
        path: 'addRec/:patientId',
        component: AddmedrecComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
