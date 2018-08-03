import { Component, OnInit } from '@angular/core';
import {GameDataService} from '../../services/game-data.service';
import {Class} from '../../data/class';
import {Character} from '../../data/character';
import {Race} from '../../data/race';

@Component({
  selector: 'app-character-cards',
  templateUrl: './character-cards.component.html'
})
export class CharacterCardsComponent implements OnInit {

  characters: Character[] = [];
  classes: Class[] = [];
  races: Race[] = [];

  constructor(private gameDataService: GameDataService) { }

  ngOnInit() {
    this.characters = this.gameDataService.characters;
  }

}
