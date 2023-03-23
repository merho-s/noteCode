import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { CodeSnippet } from 'src/app/core/models/codesnippet.model';
import { Note } from 'src/app/core/models/note.model';
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
  noteForm!: FormGroup;
  codeForm!: FormGroup;
  tagForm!: FormGroup;
  codeFormArray!: FormArray;
  tagFormArray!: FormArray;
  
  @Input() newCode!: CodeSnippet;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      tags: this.tagFormArray,
      codes: this.codeFormArray
    });
  }

  addCode() {
    this.codeForm = this.formBuilder.group({
      code: ['', Validators.required],
      description: [''],
      language: ['', Validators.required]
    })
    this.codeFormArray.push(this.codeForm.value);
  }

  addTag() {
    this.tagForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
    this.tagFormArray.push(this.tagForm.value);
  }

  onSubmitForm() {
    let newNote: Note = {
      ...this.noteForm.value,
    }
    this.noteService.addNote(newNote).pipe(
      tap(() => this.router.navigateByUrl('/notes'))
    ).subscribe();
  }
}
