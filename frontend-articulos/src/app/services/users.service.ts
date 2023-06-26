import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  URL_API = "http://localhost:3001/api/users";

  userSelected: Users = {
    username:'',
    role:''
  }

  user_types = {
    CLIENT : "client",
    ADMIN : "admin" 
  }
  user_id!:string;
  user_role!: string;
  constructor(private http: HttpClient) { }
  user: Users;

  getUser(username: string): Observable<Users>{
    return this.http.get<Users>(`${this.URL_API}/${username}`);
  }
  getRole(id: string): Observable<any>{
    return this.http.get<any>(`${this.URL_API}/role/${id}`);
  }
}
