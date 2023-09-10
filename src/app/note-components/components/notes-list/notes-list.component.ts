import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, filter, tap } from 'rxjs';
import { Note } from 'src/app/core/models/note.interface';
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
    this.notes$ = this.noteService.getUserNotesObservable();
    this.noteService.refreshUserNotes();
  }

  onAddNote() {
    this.router.navigateByUrl('notes/addnote');
  }

  //trackBy allows to track elements in a ngFor loop to not reload already existing elements if the array is updated
  noteTrackBy(index: number, note: Note) {
    return note.id;
  }
}
