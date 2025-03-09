import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Lessons } from '../models/Lessons';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  private lessonsSubject = new BehaviorSubject<Lessons[]>([]);
  lessons$ = this.lessonsSubject.asObservable();
  private baseUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) { }

  getLessons(courseId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${courseId}/lessons`);
  }

  getLessonById(courseId: number, lessonId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${courseId}/lessons/${lessonId}`);
  }

  createLesson(courseId: number, lesson: { title: string; content: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/${courseId}/lessons`, lesson);
  }

  updateLesson(courseId: number, lessonId: number, updates: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${courseId}/lessons/${lessonId}`, updates);
  }

  deleteLesson(courseId: number, lessonId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${courseId}/lessons/${lessonId}`);
  }
}
