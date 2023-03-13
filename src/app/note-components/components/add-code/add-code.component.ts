import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CodeSnippet } from 'src/app/core/models/codesnippet.model';

@Component({
  selector: 'app-add-code',
  templateUrl: './add-code.component.html',
  styleUrls: ['./add-code.component.scss']
})
export class AddCodeComponent implements OnInit {
  codeForm!: FormGroup;
  @Input() codes!: CodeSnippet[];
  @Output() newCode = new EventEmitter<CodeSnippet[]>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.codeForm = this.formBuilder.group({
      code: [null, [Validators.required]],
      description: [null],
      language: [null, [Validators.required]]
    })
  }
 

  onAddSingleCode(): void {
    this.codes.push(this.codeForm.value);
  }

  onAddAllCodes(): void {
    // if (this.codeForm.invalid) {
    //   return;
    // }
    this.newCode.emit(this.codes);
    // this.codeForm.reset();
  }
}
