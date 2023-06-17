import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, filter, tap } from 'rxjs';
import { Note } from 'src/app/core/models/note.model';
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  notes$!: Observable<Note[]>;

  constructor(private noteService: NoteService, private router: Router) {

  }

  ngOnInit() {
    this.notes$ = this.noteService.getAllNotesByUser();
  }

  onAddNote() {
    this.router.navigateByUrl('notes/addnote');
  }
}
