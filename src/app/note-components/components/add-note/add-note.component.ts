import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { CodeSnippet } from 'src/app/core/models/codesnippet.model';
import { Codetag } from 'src/app/core/models/codetag.model';
import { Note } from 'src/app/core/models/note.model';
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
  noteForm!: FormGroup;
  
  @Input() newCode!: CodeSnippet;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private noteService: NoteService) {}

  get codes() {
    return this.noteForm.get('codes') as FormArray;
  }

  get codetags() {
    return this.noteForm.get('codetags') as FormArray;
  }

  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      codetags: this.formBuilder.array([]),
      codes: this.formBuilder.array([])
    });
  }

  onAddCode() {
    const codeForm = this.formBuilder.group({
      code: ['', Validators.required],
      description: [''],
      language: ['', Validators.required]
    });
    this.codes.push(codeForm);
  }

  onDeleteCode(id: number) {
    this.codes.removeAt(id);
  }

  onAddTag() {
    const tagForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
    this.codetags.push(tagForm);
  }

  onDeleteTag(id: number) {
    this.codetags.removeAt(id);
  }

  onSubmitForm() {
    console.log(this.noteForm.value);
    this.noteService.addNote(this.noteForm.value).pipe(
      tap(() => {
        this.router.navigateByUrl('/notes');
      })
    ).subscribe();
  }
}
