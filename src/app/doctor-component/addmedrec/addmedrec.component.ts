import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-addmedrec',
  templateUrl: './addmedrec.component.html',
  styleUrls: ['./addmedrec.component.css']
})
export class AddmedrecComponent implements OnInit {

  inputTypes = ['Text', 'Text Area', 'Date', 'Boolean'];
  inputType: string;
  public medRecItem : FormGroup;
  patientId: string;
  doctorId: string;
  hospitalId: string;

  displayedColumns: string[] = ['sNo', 'key', 'value' , 'action' ];
  allRecords : Array<Object>;
  @ViewChild('form') form: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<any>;
  
  constructor(private formBuilder : FormBuilder,
    private route: ActivatedRoute,
    private doctorService : DoctorService,
    private router : Router) {

    this.patientId = "";
    this.doctorId = "";
    this.hospitalId = "";
    this.inputType = 'Text';
    this.medRecItem = this.formBuilder.group({});
    this.allRecords = [];
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

    this.medRecItem = this.formBuilder.group({
        key: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
        value: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(200)])
    })
  }

  myFilter(){
    return true;

  }

  createRec(){
    let key = this.medRecItem.value.key;
    let value = "";
    if(this.inputType === 'Date'){
      value = this.medRecItem.value.value.toDateString()
    } else{
      value = this.medRecItem.value.value;
    }
    return ({
      key : key,
      value: value
    })
  }
  onSubmit(){
    let newRec = this.createRec();
    this.resetForm();
    this.allRecords.push(newRec);
    this.dataSource = new MatTableDataSource(this.allRecords);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


  }

  submitForm(){
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      
      if (result.isConfirmed) {
        this.doctorService.addMedicalRecs(this.patientId, this.doctorId,
          this.hospitalId, this.allRecords)
          .subscribe(
            (res : any) => {
              console.log(res);
              if(res.status === true){
                this.resetForm();
                this.allRecords = [];
                this.dataSource = new MatTableDataSource(this.allRecords);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                // Swal.fire('Saved!', '', 'success')
                Swal.fire({
                  title: "Successfully Added medical Records",
                  text: `Of Patient : ${this.patientId}, By Doctor : ${this.doctorId}`,
                  icon:'success',
                  confirmButtonText: 'Ok',
                }).then(
                  (result) => {
                    if (result.isConfirmed){
                      this.resetForm();
                      this.allRecords = [];
                      this.router.navigate(['../../', 'viewPatients'], {relativeTo: this.route});
                    }
                  }
                )

              }
            },

          )
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDelete(row: any){
    this.allRecords = this.allRecords.filter(item => item !== row);
    this.dataSource = new MatTableDataSource(this.allRecords);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  resetForm(){
    this.form.resetForm();
    this.inputType = 'Text';
  }

}
