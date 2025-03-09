import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShowCoursesComponent } from './components/courses/show-courses.component';
import { MyCoursesComponent } from './components/myCourses/my-courses.component';
import { authGuard } from './guards/auth.guard';
import { teacherGuard } from './guards/teacher.guard';
import { LoginSignComponent } from './components/login-sign/login-sign.component';
import { AuthComponent } from './components/auth/auth.component';
import { UpdateCoursesComponent } from './components/updateCourses/update-courses.component';
import { LessonsManagementComponent } from './lessons-management/lessons-management.component';

export const routes: Routes = [
{path:'', component:AuthComponent} ,
{path:'home' , component:HomeComponent, canActivate:[authGuard]},
{path:'courses' , component:ShowCoursesComponent, canActivate:[authGuard]},
{path:'courses/:id' , component:MyCoursesComponent , canActivate:[authGuard]},
{path:'myCourses' , component:MyCoursesComponent, canActivate:[authGuard]},
{path:'login/:type' , component:LoginSignComponent},
{path:'updateCourses' , component:UpdateCoursesComponent, canActivate:[teacherGuard, authGuard]},
{path:'lessons-management' , component:LessonsManagementComponent , canActivate:[teacherGuard, authGuard]}];
