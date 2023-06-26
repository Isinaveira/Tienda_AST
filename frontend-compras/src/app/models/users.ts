export class Users{
    constructor(username="",role=""){
        this.username=username;
        this.role=role
    }

    username:string
    role:string
    _id?: string
}