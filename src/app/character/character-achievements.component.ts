import {Component, OnInit} from '@angular/core';
import {Character} from '../data/character';
import {GameDataService} from '../services/game-data.service';
import {BattleNetService} from '../services/battle-net.service';
import {Achievement} from '../data/achievement';

@Component({
  selector: 'app-character-achievements',
  templateUrl: './character-achievements.component.html'
})
export class CharacterAchievementsComponent implements OnInit {

  characters: Character[] = [];
  achievements: Achievement[] = [];

  constructor(private gameDataService: GameDataService, private battleNetService: BattleNetService) {
  }

  ngOnInit() {

    this.characters = this.gameDataService.characters;

    // Arsenal of Power
    this.battleNetService.getAchievement(11171).subscribe((result) => this.achievements.push(result));

    // Level 110
    this.battleNetService.getAchievement(10671).subscribe((result) => this.achievements.push(result));

    // Insurrection
    this.battleNetService.getAchievement(11340).subscribe((result) => this.achievements.push(result));

    // Fighting with Style: Classic
    this.battleNetService.getAchievement(10461).subscribe((result) => this.achievements.push(result));

    console.log(this.achievements);

  }

}
