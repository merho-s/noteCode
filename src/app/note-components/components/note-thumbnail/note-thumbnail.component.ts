import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from 'src/app/core/models/note.model';

@Component({
  selector: 'app-note-thumbnail',
  templateUrl: './note-thumbnail.component.html',
  styleUrls: ['./note-thumbnail.component.scss']
})
export class NoteThumbnailComponent {
  @Input() note!: Note;

  constructor(private router: Router) {}

  onViewNote() {
    console.log(this.note);
    this.router.navigateByUrl(`/notes/${this.note.id}`);
  }

}
