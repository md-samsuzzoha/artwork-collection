import { Component, Input, OnInit } from '@angular/core';
import { IArtwork } from 'src/app/app-artwork/model/IArtwork';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() artworks: IArtwork[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
