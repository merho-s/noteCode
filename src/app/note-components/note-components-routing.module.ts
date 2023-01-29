import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleNoteComponent } from './components/single-note/single-note.component';

const routes: Routes = [
  { path: ':id', component: SingleNoteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteComponentsRoutingModule { }