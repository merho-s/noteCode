import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteComponentsModule } from './note-components/note-components.module';
import { LoginComponent } from './core/components/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'notes', loadChildren: () => import('./note-components/note-components.module').then(m => m.NoteComponentsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
