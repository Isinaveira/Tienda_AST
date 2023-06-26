import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  URL_API = "http://localhost:3001/api/users";

  userSelected: Users = {
    role:''
  }

  user_types = {
    CLIENT : "client",
    ADMIN : "admin" 
  }
  user_id!:string;
  user_role!: string;
  constructor(private http: HttpClient) { }
  user!: Users;
  users!: Users[];

  getUser(username: string): Observable<Users>{
    return this.http.get<Users>(`${this.URL_API}/${username}`);
  }

  getUsers() {
    return this.http.get<Users[]>(`${this.URL_API}/`);
  }

  getUsersByRole(role: string){
    return this.http.get<Users[]>(`${this.URL_API}/users/role/${role}`);
  }

  getRole(id: string): Observable<any>{
    return this.http.get<any>(`${this.URL_API}/role/${id}`);
  }

  createUser(){
   
    fetch(this.URL_API, {
      method: "POST",
      body: JSON.stringify(this.userSelected),
      headers:{
        "Content-Type": "application/json"
      }
    }).then( res => res.json() )
      .then( data => { 
      {alert(`Se ha creado el usuario exitosamente con ID: ${data.id}`)}
    })
    .catch( error => {
      console.log(error);
    })
  } 

  deleteUser(_id: string){
    return this.http.delete(`${this.URL_API}/${_id}`);
  }
}
