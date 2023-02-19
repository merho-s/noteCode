import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NoteThumbnailComponent } from './components/note-thumbnail/note-thumbnail.component';
import { SingleNoteComponent } from './components/single-note/single-note.component';
import { RouterModule } from '@angular/router';
import { NoteComponentsRoutingModule } from './note-components-routing.module';
import { AddNoteComponent } from './components/add-note/add-note.component';



@NgModule({
  declarations: [
    NotesListComponent,
    NoteThumbnailComponent,
    SingleNoteComponent,
    AddNoteComponent
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
