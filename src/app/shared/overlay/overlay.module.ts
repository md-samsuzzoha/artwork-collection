import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { OverlayService } from './overlay.service';
export { OverlayService, AppOverlayConfig } from './overlay.service';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule
  ],
  providers: [OverlayService],
})
export class AppOverlayModule { }