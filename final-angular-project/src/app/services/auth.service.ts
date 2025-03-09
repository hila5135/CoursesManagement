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
}

