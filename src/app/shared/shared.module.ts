import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxSpinnerModule } from '@aposin/ng-aquila/spinner';
import { AppOverlayModule } from './overlay/overlay.module';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
export { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';

@NgModule({
  declarations: [ProgressSpinnerComponent],
  imports: [
    CommonModule,
    AppOverlayModule,
    NxSpinnerModule,
  ],
  exports: [ProgressSpinnerComponent]
})
export class SharedModule { }
