import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleNoteComponent } from './components/single-note/single-note.component';
import { AddNoteComponent } from './components/add-note/add-note.component';

const routes: Routes = [
  { path: 'addnote', component: AddNoteComponent},
  { path: ':id', component: SingleNoteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteComponentsRoutingModule { }