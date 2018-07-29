import {Component, OnInit} from '@angular/core';
import {Character} from '../data/character';
import {GameDataService} from '../data/game-data.service';

@Component({
  selector: 'app-character-achievements',
  templateUrl: './character-achievements.component.html'
})
export class CharacterAchievementsComponent implements OnInit {

  characters: Character[] = [];

  constructor(private gameDataService: GameDataService) {
  }

  ngOnInit() {
    this.characters = this.gameDataService.characters;
  }

}
