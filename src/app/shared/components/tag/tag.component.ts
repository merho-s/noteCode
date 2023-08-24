import { Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent {
  @Input() text!: string;
  @Input() isClosable: boolean = false;
  @Input() isClickable: boolean = false;
  @Input() isDeleted: boolean = false;
  @Input() startAnimation!: string;
  @Input() endAnimation: string = 'reduce-size';
  @Output() onClickEvent = new EventEmitter();
  @Output() onCloseEvent = new EventEmitter();

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {}

  ngOnInit() {
    
  }

  onClick(event?: any) {
    event?.stopPropagation();
    this.onClickEvent.emit()
  }

  onClose(event?: any) {
    event?.stopPropagation();
    this.isDeleted = true;
    //we have added animation by class with js because with ngClass we cannot use property as a class name
    this.renderer.addClass(this.elementRef.nativeElement, this.endAnimation); 
    //by adding animation by js, it doesn't trigger the native animationend, we have to add animationend event listener in js
    this.elementRef.nativeElement.addEventListener('animationend', () => {
      this.renderer.addClass(this.elementRef.nativeElement, 'hidden');
      this.onCloseAnimationEnd();
    })
  }

  onCloseAnimationEnd() {
    if(this.isDeleted) {
      this.onCloseEvent.emit();
    }
  }
}
