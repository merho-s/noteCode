import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  // @Input() newNote!: Note;
  @Input() newCode!: CodeSnippet;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      title: [null],
      description: [null, [Validators.required]],
      tags: [null]
    });
    
  }

  onSubmitForm(codes: CodeSnippet[]) {
    let newNote: Note = {
      ...this.noteForm.value,
      codes: codes
    }
    this.noteService.addNote(newNote).pipe(
      tap(() => this.router.navigateByUrl('/notes'))
    ).subscribe();
  }
}
