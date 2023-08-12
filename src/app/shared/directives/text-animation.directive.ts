import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[textAnimation]'
})
export class TextAnimationDirective {

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    let element = this.el.nativeElement as HTMLElement;
    
    if(element.textContent !== null) {
      const initialText = element.textContent;
      element.textContent = "";
      
      for(let char of initialText) {
        setTimeout(() => {
          element.textContent += char;
        }, 20);
      }
    }
    
  }

}
