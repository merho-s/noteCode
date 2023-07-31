import { Component, Input } from '@angular/core';
import { ActivatedRoute, IsActiveMatchOptions, NavigationEnd, Router } from '@angular/router';
import { Note } from 'src/app/core/models/note.model';
import { Observable, filter, map, tap } from 'rxjs'; 
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-note-thumbnail',
  templateUrl: './note-thumbnail.component.html',
  styleUrls: ['./note-thumbnail.component.scss']
})
export class NoteThumbnailComponent {
  @Input() note!: Note;
  isActive!: boolean;
  deleteEvent!: boolean;
  animationEnded!: boolean;
  
  constructor(private router: Router,
              private noteService: NoteService) {}

  ngDoCheck() {
    this.isActive = this.router.url === `/notes/${this.note.id}`;
  }

  onViewNote(event?: any) {
    // event.stopPropagation();
    this.router.navigate(['/'], {
      skipLocationChange: true
    }).then(() => this.router.navigate([`/notes/${this.note.id}`]));
  }

  onDeleteAnimation() {
    this.deleteEvent = true;
  }

  onDeleteNote() {
    if(this.deleteEvent) {
      this.animationEnded = true;
      this.noteService.deleteNote(this.note.id).subscribe();
    }
  }

}
