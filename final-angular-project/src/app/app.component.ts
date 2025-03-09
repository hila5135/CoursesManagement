import { Component } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router'; 
import { RouterOutlet,RouterLink, RouterLinkActive } from '@angular/router';
import { MenuComponent } from "./components/menu/menu.component";
import { AuthService } from './services/auth.service';
import { AuthComponent }   from "./components/auth/auth.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, RouterLink, RouterLinkActive, MenuComponent, RouterModule, AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
