import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NoteThumbnailComponent } from './components/note-thumbnail/note-thumbnail.component';
import { SingleNoteComponent } from './components/single-note/single-note.component';
import { RouterModule } from '@angular/router';
import { NoteComponentsRoutingModule } from './note-components-routing.module';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { HighlightService } from '../core/services/highlight.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCodeComponent } from './components/add-code/add-code.component';
import { SharedModule } from '../shared/shared.module';
import { TestFormarrayComponent } from './components/test-formarray/test-formarray.component';



@NgModule({
  declarations: [
    NotesListComponent,
    NoteThumbnailComponent,
    SingleNoteComponent,
    AddNoteComponent,
    AddCodeComponent,
    TestFormarrayComponent
  ],
  imports: [
    RouterModule,
    NoteComponentsRoutingModule,
    SharedModule
  ],
  exports: [
    NotesListComponent,
    NoteThumbnailComponent
  ],
  providers: [
    HighlightService
  ]
})
export class NoteComponentsModule { }
