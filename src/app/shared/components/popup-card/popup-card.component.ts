import { Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-popup-card',
  templateUrl: './popup-card.component.html',
  styleUrls: ['./popup-card.component.scss']
})
export class PopupCardComponent {
  @Input() autoCloseable: boolean = false;
  @Input() type:  'error' | 'success' | 'info' = 'info';
  isClosed: boolean = false;
  @Output() onCloseEvent = new EventEmitter();

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {}

  ngOnInit() {
    if(this.autoCloseable) {
      setTimeout(() => {
        this.onClose();
      }, 5000)
    }
  }

  onClose() {
    this.renderer.addClass(this.elementRef.nativeElement, 'slide-out-toright-in-vert-list');
    this.elementRef.nativeElement.addEventListener('animationend', () => {
      this.isClosed = true;
      this.onCloseAnimationEnd();
    })
  }

  onCloseAnimationEnd() {
    if(this.isClosed) {
      this.onCloseEvent.emit();
    }
  }
}
