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

  constructor(private http: HttpClient) {}

  // קבלת כל השיעורים בקורס מסוים
  getLessons(courseId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${courseId}/lessons`);
  }

  // קבלת שיעור לפי IDu
  getLessonById(courseId: number, lessonId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${courseId}/lessons/${lessonId}`);
  }

  // יצירת שיעור חדש (נגיש רק למורים)
  createLesson(courseId: number, lesson: { title: string; content: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/${courseId}/lessons`, lesson);
  }

  // עדכון שיעור לפי ID (נגיש רק למורים)
  updateLesson(courseId: number, lessonId: number, updates: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${courseId}/lessons/${lessonId}`, updates);
  }

  // מחיקת שיעור לפי ID (נגיש רק למורים)
  deleteLesson(courseId: number, lessonId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${courseId}/lessons/${lessonId}`);
  }
}
