import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from 'src/app/core/models/note.model';
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent {
  notes$!: Observable<Note[]>;

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.notes$ = this.noteService.getAllNotes();
  }
}
