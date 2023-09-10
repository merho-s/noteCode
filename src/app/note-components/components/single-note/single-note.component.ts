import { Component, OnInit, Input, OnChanges, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Note } from 'src/app/core/models/note.interface';
import { NoteService } from 'src/app/core/services/note.service';
import { Observable, Subscription, catchError, tap } from 'rxjs';
import { HighlightService } from 'src/app/core/services/highlight.service';
import { ControlValueAccessor } from '@angular/forms';


@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.scss']
})

export class SingleNoteComponent {
  @Input() note!: Note;
  tagsEditingMode: boolean = false;
  note$!: Observable<Note>;
  codesEditingModes: boolean[] = [];
  navigationEndSubscription$!: Subscription;

  constructor(private noteService: NoteService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.navigationEndSubscription$ = this.router.events.pipe(
      tap(event => {
        if(event instanceof NavigationEnd) {
          this.getNote();
        }
      })
    ).subscribe();
    this.getNote();
  }

  getNote() {
    const noteId = this.route.snapshot.params['id'];
    this.note$ = this.noteService.getNoteById(noteId).pipe(
      tap(note => {
        if(note.codetags.length <= 0) {
          this.tagsEditingMode = true;
        }
      })
    );
  }

  ngOnDestroy() {
    this.navigationEndSubscription$.unsubscribe();
  }
  
}
