import { Component, Input } from '@angular/core';
import { IArtworkResponse } from '../../model/IArtworkResponse';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() artworks: IArtworkResponse[] = [];
  
}
