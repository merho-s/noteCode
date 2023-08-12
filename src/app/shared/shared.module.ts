import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagComponent } from './components/tag/tag.component';
import { TextAnimationDirective } from './directives/text-animation.directive';



@NgModule({
  declarations: [
    TagComponent,
    TextAnimationDirective,
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
    TextAnimationDirective
  ]
})
export class SharedModule { }
