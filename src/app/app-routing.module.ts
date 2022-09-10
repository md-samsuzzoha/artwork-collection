import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/artwork',
    pathMatch: 'full',
  },
  {
    path: 'artwork',
    loadChildren: () => import('./app-artwork/app-artwork.module').then((m) => m.AppArtworkModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
