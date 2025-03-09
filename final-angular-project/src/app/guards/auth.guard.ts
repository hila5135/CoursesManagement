import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  const isLoggedIn= sessionStorage.getItem('token');

  if (!isLoggedIn) {
    alert("You need to login first");
    router.navigate(['/auth']);
    return false;
  }
  return true;

};
