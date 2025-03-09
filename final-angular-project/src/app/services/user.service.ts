import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  register(name: string, email: string, password: string, role: string): Observable<any> {
    return this.http.post<any>('https://api.example.com/register', { name, email, password, role });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('https://api.example.com/login', { email, password });
  }
}
