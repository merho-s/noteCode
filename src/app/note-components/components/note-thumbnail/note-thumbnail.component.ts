import { Component, Input } from '@angular/core';
import { ActivatedRoute, IsActiveMatchOptions, NavigationEnd, Router } from '@angular/router';
import { Note } from 'src/app/core/models/note.model';
import { Observable, filter, map, tap } from 'rxjs'; 

@Component({
  selector: 'app-note-thumbnail',
  templateUrl: './note-thumbnail.component.html',
  styleUrls: ['./note-thumbnail.component.scss']
})
export class NoteThumbnailComponent {
  @Input() note!: Note;
  isActive!: boolean;
  
  constructor(private router: Router) {}

  ngDoCheck() {
    this.isActive = this.router.url === `/notes/${this.note.id}` ? true : false;
  }

  onViewNote() {
    this.router.navigate(['/'], {
      skipLocationChange: true
    }).then(() => this.router.navigate([`/notes/${this.note.id}`]));
  }

}
