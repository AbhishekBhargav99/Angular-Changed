export class User {
    role: string;
    username: string;
    password: string;
    hospitalId: string;
    newPassword: string;

    constructor(role: string, username: string, 
        password = "" , hospitalId = '1', newPassword = ''){
        this.role = role;
        this.username = username;
        this.password = password;
        this.newPassword = newPassword;
        this.hospitalId = hospitalId;
    }
}
