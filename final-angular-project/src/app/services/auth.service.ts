import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import { application } from 'express';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
private url = 'http://localhost:3000/api/auth';
  constructor(private http: HttpClient) { } 
  
  // login(credentials: { email: string, password: string }): Observable<any> {
  //   return this.http.post(`${this.url}/login`, credentials);
  //   // Headers: new HttpHeaders ({'Content-Type':'application/json'})
  // }
  login(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      password: password,
    };

    return this.http.post<any>('http://localhost:3000/api/auth/login', body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
}
register(name: string, email: string, password: string, role: string): Observable<any> {
  const body = {
    name: name,
    email: email,
    password: password,
    role: role
  };
console.log("in service",body.role);

  return this.http.post<any>('http://localhost:3000/api/auth/register', body, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  });
}
  // register(user: { email: string; password: string, name: string , role: string }): Observable<any> {
  //   return this.http.post(`${this.url}/register`, user);
  // }
  // logout() {
  //   localStorage.removeItem('token'); 
  // }
  // isAuthenticated(): boolean {
  //   return !!localStorage.getItem('token'); 
  // }

  //   getUserData() {
  //     const token = localStorage.getItem('token');
  //     if (!token) return null;
  //     return jwtDecode(token);
  //   }



  // private baseUrl = 'http://localhost:3000/api/auth';

  // constructor(private http: HttpClient) {}

  // register(user:any):Observable<any>{
  //   return this.http.post(`${this.baseUrl}/register`,user)
  // }
  // login(user:any):Observable<any>{
  //   return this.http.post(`${this.baseUrl}/login`,user)
  // }

}

