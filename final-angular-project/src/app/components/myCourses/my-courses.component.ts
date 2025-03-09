import { Component, OnInit } from '@angular/core';
import { Lessons } from '../../models/Lessons';
import { LessonsService } from '../../services/lessons.service';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent implements OnInit {
  constructor(private lessonService: LessonsService,  private route: ActivatedRoute) { }
  Lessons: Lessons[] = [];

  ngOnInit(): void {
    let routeParams = this.route.snapshot.paramMap.get('id');
    let lessonId = routeParams ? parseInt(routeParams, 10) : null;
    if(lessonId !== null && !isNaN(lessonId)){
    this.lessonService.getLessons(lessonId).subscribe({
      next: (response) => {
        console.log("Response from API:", response);
        this.Lessons = response; 
      },
      error: (error) => {
        console.log("error:::", error);
      },
      complete: () => {
        console.log("Request completed successfully");
      }
    });
  }
  }

  }
