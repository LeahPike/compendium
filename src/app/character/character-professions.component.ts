import {Component, OnInit} from '@angular/core';
import {GameDataService} from '../data/game-data.service';
import {Character} from '../data/character';

@Component({
  selector: 'app-professions-list',
  templateUrl: './character-professions.component.html'
})
export class CharacterProfessionsComponent implements OnInit {

  characters: Character[] = [];

  constructor(private gameDataService: GameDataService) {
  }

  ngOnInit() {
    this.characters = this.gameDataService.characters;
  }

}
