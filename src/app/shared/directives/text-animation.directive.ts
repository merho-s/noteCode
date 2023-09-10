import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[textAnimation]'
})
export class TextAnimationDirective {

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    let element = this.el.nativeElement as HTMLElement;
    
    if(element.innerText !== null) {
      const initialText = element.innerText;
      element.innerText = "";
      
      for(let char of initialText) {
        setTimeout(() => {
          element.innerText += char;
        }, 100);
      }
    }
    
  }

}
