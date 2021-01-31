import {Component, Input, OnInit} from '@angular/core';
import {Character} from '../data/character';
import {GameDataService} from '../services/game-data.service';

@Component({
  selector: 'app-character-avatar',
  templateUrl: './character-avatar.component.html'
})
export class CharacterAvatarComponent implements OnInit {

  @Input()
  character: Character;

  classColour: string;

  ngOnInit() {
    this.classColour = GameDataService.getClassColour(this.character.character_class.name);
  }

}
