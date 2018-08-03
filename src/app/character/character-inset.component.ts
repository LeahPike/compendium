import {Component, Input, OnInit} from '@angular/core';
import {Character} from '../data/character';
import {GameDataService} from '../services/game-data.service';

@Component({
  selector: 'app-character-insert',
  templateUrl: './character-inset.component.html'
})
export class CharacterInsetComponent implements OnInit {

  @Input()
  character: Character;

  classColour: string;

  constructor(private gameDataService: GameDataService) {
  }

  ngOnInit() {
    this.classColour = this.gameDataService.getClassColour(this.character.class);
  }

}
