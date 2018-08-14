import {Component, OnInit} from '@angular/core';
import {Character} from '../../data/character';
import {GameDataService} from '../../services/game-data.service';
import {BattleNetService} from '../../services/battle-net.service';
import {Achievement} from '../../data/achievement';

@Component({
  selector: 'app-character-achievements',
  templateUrl: './character-achievements.component.html'
})
export class CharacterAchievementsLegionComponent implements OnInit {

  characters: Character[] = [];
  achievements: Achievement[] = [];

  constructor(private gameDataService: GameDataService, private battleNetService: BattleNetService) {
  }

  ngOnInit() {

    this.characters = this.gameDataService.characters;
    this.achievements = this.gameDataService.achievementsLegion;
  }

}
