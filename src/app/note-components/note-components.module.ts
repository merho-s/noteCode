import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NoteThumbnailComponent } from './components/note-thumbnail/note-thumbnail.component';
import { SingleNoteComponent } from './components/single-note/single-note.component';
import { RouterModule } from '@angular/router';
import { NoteComponentsRoutingModule } from './note-components-routing.module';



@NgModule({
  declarations: [
    NotesListComponent,
    NoteThumbnailComponent,
    SingleNoteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NoteComponentsRoutingModule
  ],
  exports: [
    NotesListComponent,
    NoteThumbnailComponent
  ]
})
export class NoteComponentsModule { }
