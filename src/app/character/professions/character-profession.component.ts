import {Component, Input} from '@angular/core';
import {GameDataService} from '../../services/game-data.service';
import {Profession} from '../../data/profession';

@Component({
  selector: 'app-character-profession',
  templateUrl: './character-profession.component.html'
})
export class CharacterProfessionComponent {

  @Input()
  profession: Profession;

  constructor(private gameDataService: GameDataService) {

  }

}
