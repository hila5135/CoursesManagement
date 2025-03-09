import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlightOnHover]',
  standalone: true
})
export class HighlightOnHoverDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.05)');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.3s ease-in-out');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 4px 12px rgba(56, 160, 225, 0.3)');
    this.renderer.setStyle(this.el.nativeElement, 'background', 'linear-gradient(45deg,rgb(77, 206, 198),rgb(143, 130, 131))');
    this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
    this.renderer.setStyle(this.el.nativeElement, 'border-radius', '0.3rem'); 
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', 'none');
    this.renderer.setStyle(this.el.nativeElement, 'background', 'transparent');
    this.renderer.setStyle(this.el.nativeElement, 'color',  'rgb(4, 166, 166)');
  }
}

