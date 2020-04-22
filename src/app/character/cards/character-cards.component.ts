import { Component, OnInit } from '@angular/core';
import {GameDataService} from '../../services/game-data.service';
import {Character} from '../../data/character';

@Component({
  selector: 'app-character-cards',
  templateUrl: './character-cards.component.html'
})
export class CharacterCardsComponent implements OnInit {

  characters: Character[] = [];

  constructor(private gameDataService: GameDataService) { }

  ngOnInit() {
    this.characters = this.gameDataService.characters;
  }

}
