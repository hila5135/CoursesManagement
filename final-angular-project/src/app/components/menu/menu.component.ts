import { Component } from '@angular/core';
import { RouterOutlet,RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HighlightOnHoverDirective } from '../../directives/highlight-on-hover.directive';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive,RouterOutlet,HighlightOnHoverDirective],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
