import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appNavActive]',
})
export class NavActiveDirective implements OnInit {
  previousTarget: HTMLElement | null = null;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.listen(
      this.elRef.nativeElement,
      'click',
      this.clickHandler.bind(this)
    );
  }

  clickHandler(e: MouseEvent) {
    const targetElement = e.target as HTMLElement;

    const previousActiveLink = document.querySelector('.active');
    console.log(previousActiveLink)
    if (previousActiveLink) {
      this.renderer.removeClass(previousActiveLink, 'active');
    }

    this.renderer.addClass(targetElement, 'active');
  }
}
