import {Component, Input, OnInit} from '@angular/core';
import {Character} from '../../data/character';
import {GameDataService} from '../../services/game-data.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input()
  character: Character;

  classColour: string;

  ngOnInit(): void {
    this.classColour = GameDataService.getClassColour(this.character.character_class.name);
  }

}
