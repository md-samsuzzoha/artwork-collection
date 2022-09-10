import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxCardModule } from '@aposin/ng-aquila/card';
import { NxCheckboxModule } from '@aposin/ng-aquila/checkbox';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxGridModule } from '@aposin/ng-aquila/grid';
import { NxHeadlineModule } from '@aposin/ng-aquila/headline';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxModalModule } from '@aposin/ng-aquila/modal';
import { NxPaginationModule } from '@aposin/ng-aquila/pagination';
import { NxSpinnerModule } from '@aposin/ng-aquila/spinner';
import { SharedModule } from '../shared/shared.module';
import { ArtworkListComponent } from './components/artwork-list/artwork-list.component';
import { CardComponent } from './components/card/card.component';
import { ArtworkService } from './services/artwork.service';

const routes: Routes = [
  {
    path: '',
    component: ArtworkListComponent,
  },
];


@NgModule({
  declarations: [
    ArtworkListComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NxButtonModule,
    NxCheckboxModule,
    NxDropdownModule,
    NxFormfieldModule,
    NxGridModule,
    NxHeadlineModule,
    NxInputModule,
    NxModalModule,
    NxPaginationModule,
    NxSpinnerModule,
    NxCardModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [
    ArtworkService
  ]
})
export class AppArtworkModule { }
