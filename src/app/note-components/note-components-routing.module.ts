import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleNoteComponent } from './components/single-note/single-note.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';

const routes: Routes = [
  { path: ':id', component: SingleNoteComponent },
  { path: '', component: NotesListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteComponentsRoutingModule { }