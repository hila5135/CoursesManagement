import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MenuComponent } from "../menu/menu.component";
import { Users } from '../../models/Users';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login-sign',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-sign.component.html',
  styleUrl: './login-sign.component.css'
})
export class LoginSignComponent implements OnInit {
  public isLogin: Boolean = false;

  SignInForm = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required]),
    email: new FormControl<string | null>(null, [Validators.required]),
    password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(6)]),
    role: new FormControl<string | null>(null, [Validators.required]),
  })

  constructor(private authService: AuthService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap.get('type');
    if (routeParams === 'login') {
      this.isLogin = true;
    }
    // localStorage.setItem('token', '');
    const storedRole = sessionStorage.getItem('role');
   console.log('Loaded Role:', storedRole);
    // sessionStorage.setItem('token', '');
  }
  toggleMode() {
    this.isLogin = !this.isLogin;
  }
  Submit() {
    if (this.SignInForm.valid) {
      const name = this.SignInForm.value.name as string;
      const email = this.SignInForm.value.email as string;
      const password = this.SignInForm.value.password as string;
      const role = this.SignInForm.value.role as string;
      if (this.isLogin) {
        const user = { email, password};
        this.authService.login(user.email, user.password).subscribe({
          next: (res) => {
            console.log('login response', res);
            alert('Login successful!');
            sessionStorage.setItem('token', res.token);
            sessionStorage.setItem('userId', res.userId);
            sessionStorage.setItem('role', res.role);
          },
          error: (err) => {
            alert('Login failed: ' + err.error.message);
          }

        })
      }
      else {
        const newUser = new Users(0, name, email, password, role);
        this.authService.register(newUser.name, newUser.email, newUser.password, newUser.role).subscribe({
          next: (res) => {
            alert('Registration successful!');
            sessionStorage.setItem('token', res.token);
            sessionStorage.setItem('userId', res.userId);
            sessionStorage.setItem('role', res.role);
          },
          error: (err) => {
            alert('Registration failed: ' + err.error.message);
          }
        });
      }
    }
  }
}
