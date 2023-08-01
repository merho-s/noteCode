import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Output() onClickEvent = new EventEmitter();
  @Output() onCloseEvent = new EventEmitter();

  onClick(event?: any) {
    event?.stopPropagation();
    this.onClickEvent.emit()
  }

  onClose(event?: any) {
    event?.stopPropagation();
    this.onCloseEvent.emit();
  }
}
