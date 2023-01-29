import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note } from 'src/app/core/models/note.model';
import { NoteService } from 'src/app/core/services/note.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.scss']
})
export class SingleNoteComponent implements OnInit {
  @Input() note!: Note;

  note$!: Observable<Note>;

  constructor(private noteService: NoteService,
              private route: ActivatedRoute) {}
  ngOnInit() {
    const noteId = this.route.snapshot.params['id'];
    this.note$ = this.noteService.getNoteById(noteId);
  }
  
}
