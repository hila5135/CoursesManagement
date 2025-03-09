
import { Component } from '@angular/core';
import { LessonsService } from '../services/lessons.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-lessons-management',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './lessons-management.component.html',
  styleUrl: './lessons-management.component.css'
})
export class LessonsManagementComponent {
  lessonForm: FormGroup;
  lessons: any[] = [];
  courses: any[] = [];
  constructor(private fb: FormBuilder, private lessonService: LessonsService, private coursesService: CoursesService) {
    this.lessonForm = this.fb.group({
      courseId: ['', Validators.required],
      lessonId: [''],
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.lessonService.getLessons(this.lessonForm.value.courseId).subscribe((response) => {
      console.log("response from API:", response);
      this.lessons = response;

    })
  }

  addLesson() {
    const { courseId, title, content } = this.lessonForm.value;
    this.lessonService.createLesson(courseId, { title, content }).subscribe(response => {
      alert('Lesson added successfully!');
      this.loadLessons();
    });
  }
  loadCourses() {
    this.coursesService.getAllCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (err) => {
        console.error('Error loading courses:', err);
      }
    });

  }
  loadLessons() {
    this.loadCourses();
    this.courses.forEach(course => {
      this.lessonService.getLessons(course.id).subscribe({
        next: (lessons) => {
          this.lessons = lessons;
        },
        error: (err) => {
          console.error('Error loading lessons:', err);
        }
      });
    });
  }

  deleteLesson() {
    const { courseId, lessonId } = this.lessonForm.value;
    this.lessonService.deleteLesson(courseId, lessonId).subscribe(response => {
      alert('Lesson deleted successfully!');
      this.loadLessons();
    });
  }

  updateLesson() {
    const courseId = this.lessonForm.value.courseId;
    const lessonId = this.lessonForm.value.lessonId;
    const title = this.lessonForm.value.title;
    const content = this.lessonForm.value.content;

    this.lessonService.updateLesson(courseId, lessonId, { title, content }).subscribe(response => {
      alert('Lesson updated successfully!');
      this.loadLessons();
    });
  }
}
