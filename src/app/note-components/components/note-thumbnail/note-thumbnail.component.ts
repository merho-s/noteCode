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
  noteRoute!: string;
  currentRoute$!: Observable<boolean>;
  currentRoute!: string;
  
  constructor(private router: Router) {}

  ngOnInit() {
    this.noteRoute = `/notes/${this.note.id}`;
  }

  ngDoCheck() {
    // this.router.events.pipe(
    //   filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    //   map((event: NavigationEnd) => this.isActive = this.noteRoute === event.url),
    //   tap((value) => console.log(value))
    // ).subscribe();
  }


  onViewNote() {
    this.router.navigate(['/'], {
      skipLocationChange: true
    }).then(() => this.router.navigate([`/notes/${this.note.id}`]).then(() => this.currentRoute = this.router.url)
    );
  }

}
