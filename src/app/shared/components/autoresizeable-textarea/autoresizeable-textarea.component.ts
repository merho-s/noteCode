import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-autoresizeable-textarea',
  templateUrl: './autoresizeable-textarea.component.html',
  styleUrls: ['./autoresizeable-textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AutoresizeableTextareaComponent,
      multi: true
    }
  ]
})
export class AutoresizeableTextareaComponent implements ControlValueAccessor {
  @Input() placeholder!: string;
  @Input() fontColor: any = 'black';
  @Input() backgroundColor: any = 'inherit';
  value!: string;
  touched = false;
  disabled = false;
  onChange = (value: any) => {};
  onTouched = () => {};
  @ViewChild('customTextarea') customTextarea: any;

  constructor(private renderer: Renderer2) {}
  

  ngAfterViewInit() {
    if(this.customTextarea) {
      const textArea = this.customTextarea.nativeElement;
      this.renderer.setStyle(textArea, 'background-color', this.backgroundColor);
      this.renderer.setStyle(textArea, 'color', this.fontColor);
      this.autoResizeHeight(textArea);
    }
  }
  
  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  markAsTouched() {
    if(!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  onInput(event: any) {
    const target = event.target as HTMLTextAreaElement;
    this.markAsTouched();
    if(!this.disabled) {
      this.value = target.value;
      this.onChange(this.value);
      this.autoResizeHeight(target);
    }
  }

  autoResizeHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
}
