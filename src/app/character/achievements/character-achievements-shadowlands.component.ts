import {Component, OnDestroy, OnInit} from '@angular/core';
import {Character} from '../../data/character';
import {GameDataService} from '../../services/game-data.service';
import {Achievement} from '../../data/achievement';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-character-achievements',
  templateUrl: './character-achievements.component.html'
})
export class CharacterAchievementsShadowlandsComponent implements OnInit, OnDestroy {

  characters: Character[] = [];
  characterSubscription: Subscription;

  achievements: Achievement[] = [];
  achievementsSubscription: Subscription;

  constructor(private gameDataService: GameDataService) {
  }

  ngOnInit(): void {
    this.characterSubscription = this.gameDataService.characterSubject.subscribe((characters) => {
      this.characters = characters;
    });
    this.achievementsSubscription = this.gameDataService.achievementsIdsShadowlandsSubject.subscribe((achievementIds) => {
      this.gameDataService.getAchievements(achievementIds).subscribe((achievements) => {
        this.achievements = achievements;
      });
    });
  }

  ngOnDestroy() {
    this.characterSubscription.unsubscribe();
    this.achievementsSubscription.unsubscribe();
  }
}
