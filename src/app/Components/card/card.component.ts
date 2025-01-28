import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input({ required: true })
  image: string = '';

  @Input({ required: true })
  title: string = '';

  @Input({ required: true })
  description: string = '';

  @Input({ required: true })
  releaseDate: string = '';
}
