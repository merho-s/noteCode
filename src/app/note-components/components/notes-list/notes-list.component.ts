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
    this.notes$ = this.noteService.getUserNotesObservable();
    this.noteService.refreshUserNotes();
  }

  onAddNote() {
    this.router.navigateByUrl('notes/addnote');
  }

  //trackBy permet de traquer de les éléments dans un ngFor pour ne pas à recharger un élément déjà existant si le tableau est mis à jour
  noteTrackBy(index: number, note: Note) {
    return note.id;
  }
}
