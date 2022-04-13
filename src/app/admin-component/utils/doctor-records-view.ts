export interface DoctorRecord{
    id: string;
    firstName: string;
    lastName: string;
    speciality: string;
    email: string;
}

export class DoctorRecordsView {
    id = '';
    firstName = '';
    lastName = '';
    speciality ='';
    email = '';
  
    constructor(readonly DoctorRecord : DoctorRecord) {
        this.id = DoctorRecord.id;
        this.firstName = DoctorRecord.firstName;
        this.lastName = DoctorRecord.lastName;
        this.speciality = DoctorRecord.speciality;
        this.email = DoctorRecord.email;
    }

}
