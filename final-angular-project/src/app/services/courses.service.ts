import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Courses } from '../models/Courses';
import { Lessons } from '../models/Lessons';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
    // private baseUrl = 'http://localhost:3000/api/courses';
    private coursesSubject = new BehaviorSubject<Courses[]>([]);
    courses$ = this.coursesSubject.asObservable();
  
    constructor(private http:HttpClient) { }
  
  
    getAllCourses(): Observable<Courses[]> {
      return this.http.get<Courses[]>('http://localhost:3000/api/courses');
    }
    getAllStudentCourses(): Observable<Courses[]> {
      return this.http.get<Courses[]>(`http://localhost:3000/api/courses/student/${localStorage.getItem('userId')}`);
    }
    getlessons(courseId:number|undefined){
      return this.http.get<Lessons[]>(`http://localhost:3000/api/courses/${courseId}/lessons`)
    }
    
    createCourse(data:any){
      return this.http.post('http://localhost:3000/api/courses',data)
    }
  
    updateCourse(updateData:any,selctedCours:number|undefined|null ){
      return this.http.put(`http://localhost:3000/api/courses/${selctedCours}`, updateData, {
      })
    }
  
    deleteCourse(id:number|undefined){
      return this.http.delete(`http://localhost:3000/api/courses/${id}`, {
  
      })
    }
  
    joinCourse(id:number| undefined, userId:string|null){
     return this.http.post(`http://localhost:3000/api/courses/${id}/enroll`,{userId})
    }
  
    leaveCourse(id:number| undefined, userId:string|null){
      return this.http.delete(`http://localhost:3000/api/courses/${id}/unenroll`,{body: {userId}})
     }
  }