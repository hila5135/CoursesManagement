// import { CanActivateFn } from '@angular/router';


// export const teacherGuard: CanActivateFn = (route, state) => {
//   return localStorage.getItem('role')=='teacher' || localStorage.getItem('role') == 'Teacher';
// };
import { CanActivateFn } from '@angular/router';

export const teacherGuard: CanActivateFn = (route, state) => {
  const role = sessionStorage.getItem('role') || ''; 
  console.log('TeacherGuard - Role:', role); 

  if (role.toLowerCase() === 'teacher') {
    return true;
  }

  console.warn('TeacherGuard - גישה נדחתה למשתמש ללא הרשאות מורה');
  return false;
};
