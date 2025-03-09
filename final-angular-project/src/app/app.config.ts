import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS,provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from '../app/services/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { tokenInterceptor } from '../interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers:[
     provideRouter(routes),
      provideClientHydration(),
      provideAnimationsAsync()
      , provideHttpClient(withInterceptors([tokenInterceptor])),
    provideAnimationsAsync(), 
    provideAnimationsAsync()], 
};
