import { OverlayRef } from '@angular/cdk/overlay';
import { Component, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

import { AppOverlayConfig, OverlayService } from '../overlay/overlay.module';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
})
export class ProgressSpinnerComponent {
  backdropEnabled = true;
  positionGloballyCenter = true;
  @Input() isShow: boolean = false;

  @ViewChild('progressSpinnerRef', { read: TemplateRef, static: true })
  private progressSpinnerRef!: TemplateRef<any>;
  private progressSpinnerOverlayConfig!: AppOverlayConfig;
  private overlayRef!: OverlayRef;
  constructor(private vcRef: ViewContainerRef, private overlayService: OverlayService) { }
  ngOnInit() {
    // Config for Overlay Service
    this.progressSpinnerOverlayConfig = {
      hasBackdrop: this.backdropEnabled
    };
    if (this.positionGloballyCenter) {
      this.progressSpinnerOverlayConfig['positionStrategy'] = this.overlayService.positionGloballyCenter();
    }
    // Create Overlay for progress spinner
    this.overlayRef = this.overlayService.createOverlay(this.progressSpinnerOverlayConfig);
  }
  ngDoCheck() {
    // Based on status of displayProgressSpinner attach/detach overlay to progress spinner template
    if (this.isShow && !this.overlayRef.hasAttached()) {
      this.overlayService.attachTemplatePortal(this.overlayRef, this.progressSpinnerRef, this.vcRef);
    } else if (!this.isShow && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }
}