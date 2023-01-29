import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteComponentsModule } from './note-components/note-components.module';

const routes: Routes = [
  { path: '' },
  { path: 'notes', loadChildren: () => import('./note-components/note-components.module').then(m => m.NoteComponentsModule) }
  // { path: '', component: LandingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
