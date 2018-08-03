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

    // Breaking the Sound Barrier
    this.battleNetService.getAchievement(5180).subscribe((result) => this.achievements.push(result));

    // Level 110
    this.battleNetService.getAchievement(10671).subscribe((result) => this.achievements.push(result));

    // Arsenal of Power
    this.battleNetService.getAchievement(11171).subscribe((result) => this.achievements.push(result));

    // Fighting with Style: Classic
    this.battleNetService.getAchievement(10461).subscribe((result) => this.achievements.push(result));

    // A Glorious Campaign
    this.battleNetService.getAchievement(10994).subscribe((result) => this.achievements.push(result));

    // Legendary Research
    this.battleNetService.getAchievement(11223).subscribe((result) => this.achievements.push(result));

    // Improving on History
    this.battleNetService.getAchievement(10459).subscribe((result) => this.achievements.push(result));

    // A Classy Outfit
    this.battleNetService.getAchievement(11298).subscribe((result) => this.achievements.push(result));

    // Breaching the Tomb
    this.battleNetService.getAchievement(11546).subscribe((result) => this.achievements.push(result));
  }

}
