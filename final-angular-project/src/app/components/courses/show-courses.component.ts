import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Courses } from '../../models/Courses';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-show-courses',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule,MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatListModule, MatCardModule],
  templateUrl: './show-courses.component.html',
  styleUrls: ['./show-courses.component.css']
})
export class ShowCoursesComponent implements OnInit {

  courses: Courses[] = [];
  constructor(private coursesService: CoursesService) { }
  
  userId: string | null = null;
  userIdNumber: number | null = null; // שינוי כאן
  
  ngOnInit() :void{
    this.coursesService.getAllCourses().subscribe((response) => {
      console.log("response from API:", response);
      this.courses = response;
      
    })}
    JoinCourse(id:number| undefined){
      const userId=localStorage.getItem('userId')
      this.coursesService.joinCourse(id,userId).subscribe({
        next:res=>{
          console.log("Joined course successfully");
          alert('Joined course successfully')
          
        },
        error: err=>{
          alert('Joined course failed, You are already registered for this course.')
        }
        
      });
      }
      LeaveCourse(id:number| undefined){
        const userId=localStorage.getItem('userId')
        this.coursesService.leaveCourse(id,userId).subscribe({
          next:res=>{
            console.log("unenroll course successfully");
            alert('unenroll course successfully')
            
          },
          error: err=>{
            alert('leave course failed, You are dont register to for this course.')
          }
  
        });
        }

}
