import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from 'src/app/core/models/note.model';
import { tap } from 'rxjs'; 
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-note-thumbnail',
  templateUrl: './note-thumbnail.component.html',
  styleUrls: ['./note-thumbnail.component.scss']
})
export class NoteThumbnailComponent {
  @Input() note!: Note;
  isActive: boolean = false;
  isDeleted: boolean = false;
  deleteAnimationEnded: boolean = false;
  
  constructor(private router: Router,
              private noteService: NoteService) {}

  ngDoCheck() {
    this.isActive = this.router.url === `/notes/${this.note.id}`;
  }

  onViewNote() {
    this.router.navigate(['/'], {
      skipLocationChange: true
    }).then(() => this.router.navigate([`/notes/${this.note.id}`]));
  }

  onDeleteAnimationEnd() {
    if(this.isDeleted) {
      this.deleteAnimationEnded = true;
      this.noteService.refreshUserNotes();
    }
  }

  onDeleteNote(event?: any) {
    event.stopPropagation();
    this.noteService.deleteNote(this.note.id).pipe(
      tap(res => {
        if(res) {
          this.isDeleted = true;
          this.router.navigateByUrl('');
        }
      })
    ).subscribe();
  }

}
