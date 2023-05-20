import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleNoteComponent } from './components/single-note/single-note.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { NotesHomeComponent } from './components/notes-home/notes-home.component';

const routes: Routes = [
  { path: '', component: NotesHomeComponent},
  { path: 'addnote', component: AddNoteComponent},
  { path: ':id', component: SingleNoteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteComponentsRoutingModule { }