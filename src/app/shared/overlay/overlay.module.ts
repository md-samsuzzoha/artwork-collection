import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OverlayService } from './overlay.service';
export { AppOverlayConfig, OverlayService } from './overlay.service';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule
  ],
  providers: [OverlayService],
})
export class AppOverlayModule { }