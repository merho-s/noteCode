import { Component, OnInit, Input, OnChanges, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note } from 'src/app/core/models/note.model';
import { NoteService } from 'src/app/core/services/note.service';
import { Observable } from 'rxjs';
import 'prismjs';
import { HighlightService } from 'src/app/core/services/highlight.service';
import 'prismjs/components/prism-typescript';

declare var Prism: any;

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.scss']
})

export class SingleNoteComponent implements OnInit, AfterViewChecked {
  @Input() note!: Note;
  // highlighted: boolean = false;
  note$!: Observable<Note>;

  constructor(private noteService: NoteService,
              private route: ActivatedRoute,
              private highlightService: HighlightService) {}
  
  ngAfterViewChecked(): void {
    Prism.highlightAll();
  }

  ngOnInit() {
    const noteId = this.route.snapshot.params['id'];
    this.note$ = this.noteService.getNoteById(noteId);
  }
  
}
