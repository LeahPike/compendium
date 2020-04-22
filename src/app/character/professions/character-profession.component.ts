import {Component, Input} from '@angular/core';
import {CharacterProfession} from '../../data/character-profession';

@Component({
  selector: 'app-character-profession',
  templateUrl: './character-profession.component.html'
})
export class CharacterProfessionComponent {

  @Input()
  profession: CharacterProfession;

  constructor() {
  }

}
