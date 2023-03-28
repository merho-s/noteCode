import { Component } from "@angular/core";
import { FormArray, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'form-array-example',
  templateUrl: 'test-formarray.component.html',
  styleUrls: ['test-formarray.component.scss']
})
export class TestFormarrayComponent {

    form = this.fb.group({
        lessons: this.fb.array([])
    });

    constructor(private fb:FormBuilder) {}
  
    get lessons() {
      return this.form.controls["lessons"] as FormArray;
    }

    addLesson() {
      const lessonForm = this.fb.group({
        title: ['', Validators.required],
        level: ['beginner', Validators.required]
      });
      this.lessons.push(lessonForm);
    }

    deleteLesson(lessonIndex: number) {
      this.lessons.removeAt(lessonIndex);
    }
}