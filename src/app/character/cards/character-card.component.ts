import {Component, Input, OnChanges} from '@angular/core';
import {Character} from '../../data/character';
import {GameDataService} from '../../services/game-data.service';
import {Class} from '../../data/class';
import {Race} from '../../data/race';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html'
})
export class CharacterCardComponent implements OnChanges {

  @Input()
  character: Character;

  class: Class = null;
  race: Race = null;

  constructor(private gameDataService: GameDataService) {

  }

  ngOnChanges() {
    if (this.character) {
      this.class = this.gameDataService.findClass(this.character.class);
      this.race = this.gameDataService.findRace(this.character.race);
    }
  }
}
