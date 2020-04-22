import {Component, Input} from '@angular/core';
import {Character} from '../../data/character';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html'
})
export class CharacterCardComponent {

  @Input()
  character: Character;

  constructor() {

  }
}
