import { NgModule } from '@angular/core';
import { NavigationEnd, Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { filter, map, tap } from 'rxjs';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'notes', 
    loadChildren: () => import('./note-components/note-components.module').then(m => m.NoteComponentsModule), 
    canActivate: [AuthGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 
}
