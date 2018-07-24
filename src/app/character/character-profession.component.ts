import {Component, Input} from '@angular/core';
import {GameDataService} from '../data/game-data.service';

@Component({
  selector: 'character-profession',
  templateUrl: './character-profession.component.html'
})
export class CharacterProfessionComponent {

  constructor(private gameDataService: GameDataService) {

  }

}
