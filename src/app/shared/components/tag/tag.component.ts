import { Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent {
  @Input() text!: string;
  @Input() isClosable: boolean = false;
  @Input() isInput: boolean = false;
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
    this.renderer.addClass(this.elementRef.nativeElement, this.endAnimation);
    this.elementRef.nativeElement.addEventListener('animationend', () => {
      this.onCloseAnimationEnd();
    })
  }

  onCloseAnimationEnd() {
    if(this.isDeleted) {
      this.onCloseEvent.emit();
    }
  }
}
