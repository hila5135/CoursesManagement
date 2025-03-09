// import { Component, OnInit } from '@angular/core';
// import { Courses } from '../../models/Courses';
// import { CoursesService } from '../../services/courses.service';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AuthInterceptor } from '../../services/auth.interceptor';

// @Component({
//   selector: 'app-update-courses',
//   standalone: true,
//   imports: [],
//   providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } ],  
//   templateUrl: './update-courses.component.html',
//   styleUrl: './update-courses.component.css'
// })
// export class UpdateCoursesComponent implements OnInit {
// courses: Courses[] = [];
// constructor(private coursesService: CoursesService){}

// ngOnInit(){
//   this.coursesService.getCourses().subscribe((response) => {
//     this.courses = response;
//   });

// }
// // add(courseId: number){
// //   let c = this.coursesService.getCoursesById(courseId); 
// //   this.coursesService.createCourse(c);
// // }
// // remove(courseId: number){
// //   this.coursesService.deleteCourse(courseId);
// // }

// }
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Courses } from '../../models/Courses';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { CoursesService } from '../../services/courses.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-courses',
  standalone: true,
  imports: [FormsModule,MatButtonModule,MatInputModule,MatFormFieldModule,MatIconModule,ReactiveFormsModule,MatCardModule, RouterModule, MatListModule],
  templateUrl: './update-courses.component.html',
  styleUrl: './update-courses.component.css'
})


export class UpdateCoursesComponent {
  courses: Courses[] = [];
  // newCourse: Courses = {
  //   title: '',
  //   description: '',
  //   courseId: 0,
  //   teacherId: 0
  // };
  // editingCourse: Courses | null = null;
  // constructor(private courseService: CoursesService) { }

  // ngOnInit() {
  //   this.courseService.getCourses().subscribe((response) => {
  //     this.courses = response;
  //   })
  // }

  // addCourse() {
  //   this.courseService.createCourse(this.newCourse).subscribe(course => {
  //     this.courses.push(course);
  //     this.newCourse = { title: '', description: '', courseId: 0, teacherId: 0 };
  //   });
  // }
  // remove(courseId: number) {
  //   const userId = sessionStorage.getItem('userId');
  //   this.courseService.deleteCourse(courseId).subscribe(() => {
  //     this.courses = this.courses.filter(c => c.courseId !== courseId);
  //   });
  // }


  // editCourse(course: Courses) {
  //   this.editingCourse = { ...course };
  // }

  // updateCourse() {
  //   if (!this.editingCourse) return;

  //   this.courseService.updateCourse(this.editingCourse.courseId, this.editingCourse).subscribe(() => {
  //     this.courses = this.courses.map(c => c.courseId === this.editingCourse!.courseId ? this.editingCourse! : c);
  //     this.editingCourse = null;
  //   });
  // }
  // cancelEdit() {
  //   this.editingCourse = null;
  // }


  myForm: FormGroup;
  isForbidden = false;


  constructor(private fb: FormBuilder, private courseService: CoursesService) {
    this.myForm = this.fb.group({
      id: [''],
      title: [''],
      content: ['']
    });
  }

  addFlag: boolean = false
  deleteFlag: boolean = false
  updateFlag: boolean = false
loadCourses(){
  this.courseService.getAllCourses().subscribe({
    next: (courses) => {
      // עדכון הרשימה המקומית של הקורסים ברגע שהמידע התקבל מהשרת
      this.courses = courses;
    },
    error: (err) => {
      console.error('Error loading courses:', err);
    }
  });

}

  addClick() {
    this.addFlag = true
    this.deleteFlag = false
    this.updateFlag = false
  }

  deleteClick() {
    this.deleteFlag = true
    this.addFlag = false
    this.updateFlag = false
  }

  updateClick() {
    this.updateFlag = true
    this.addFlag = false
    this.deleteFlag = false
  }

  onSubmitAdd() {
    console.log(this.myForm.value);
    const { title, content } = this.myForm.value
    const data={title, description: content}

    this.courseService.createCourse(data).subscribe({
      next: res =>{ console.log('Success:', res),
        this.myForm.reset();
      },
      error: err =>{ console.error('Error:', err)
        this.isForbidden = true
      }
      })
  }

  onSubmitDelete() {
    const courseId = this.myForm.value.id
    console.log("the id:",courseId);
    this.courseService.deleteCourse(courseId).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error('Error fetching courses:', error);
        this.isForbidden = true
      })
  }
  onSubmitUpdate() {
    const courseData = {
      title: this.myForm.value.title,
      description: this.myForm.value.content,
      teacherId: Number(sessionStorage.getItem('userId'))
    }
    const courseId = this.myForm.value.id
    console.log(this.myForm.value.id);    

    this.courseService.updateCourse(courseData,courseId).subscribe(
      (data) => {
        console.log("course updated succesfully", data);
        // this.courses = this.courses.map(course=>course.id === courseId ? {...course, ...courseData}:course)
        this.loadCourses();
      },
      (error) => {
        console.error('Error fetching courses:', error)
        this.isForbidden = true
      })
 
  }
}