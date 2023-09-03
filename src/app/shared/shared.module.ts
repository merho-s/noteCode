import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagComponent } from './components/tag/tag.component';
import { TextAnimationDirective } from './directives/text-animation.directive';
import { PopupCardComponent } from './components/popup-card/popup-card.component';
import { AutoresizeableTextareaComponent } from './components/autoresizeable-textarea/autoresizeable-textarea.component';



@NgModule({
  declarations: [
    TagComponent,
    TextAnimationDirective,
    PopupCardComponent,
    AutoresizeableTextareaComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TagComponent,
    PopupCardComponent,
    TextAnimationDirective,
    AutoresizeableTextareaComponent
  ]
})
export class SharedModule { }
