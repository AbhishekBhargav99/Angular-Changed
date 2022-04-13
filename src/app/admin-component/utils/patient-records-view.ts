export interface PatientRecord{
    patientId: string;
    firstName: string;
    lastName: string;
    // emergPhoneNumber: string;
    phoneNumber: string;
    email: string;
}

export class PatientRecordsView {
    patientId = '';
    firstName = '';
    lastName = '';
    phoneNumber = '';
    email = '';
  
    constructor(readonly patientRecord: PatientRecord) {
      this.patientId = patientRecord.patientId;
      this.firstName = patientRecord.firstName;
      this.lastName = patientRecord.lastName;
    //   this.docType = patientRecord.docType;
      this.email = patientRecord.email;
      // this.emergPhoneNumber = patientRecord.emergPhoneNumber;
      this.phoneNumber = patientRecord.phoneNumber;
    }
}
