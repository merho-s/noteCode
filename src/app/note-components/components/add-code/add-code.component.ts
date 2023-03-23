import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CodeSnippet } from 'src/app/core/models/codesnippet.model';

@Component({
  selector: 'app-add-code',
  templateUrl: './add-code.component.html',
  styleUrls: ['./add-code.component.scss']
})
export class AddCodeComponent implements OnInit {
  codeForm!: FormGroup;
  codeNumbers: number = 1;
  codes!: CodeSnippet[];
  @Output() newCode = new EventEmitter<CodeSnippet[]>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.codeForm = this.formBuilder.group({
      code: new FormControl('', Validators.required),
      description: new FormControl(''),
      language: new FormControl('', Validators.required)
    })
  }
 
  onAddSingleCode(): void {
    this.codes.push(this.codeForm.value);
    this.codeNumbers++;
  }

  onAddAllCodes(): void {
    this.newCode.emit(this.codes);
  }
}
