import {Component, OnDestroy, OnInit} from '@angular/core';
import {Character} from '../../data/character';
import {GameDataService} from '../../services/game-data.service';
import {Achievement} from '../../data/achievement';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html'
})
export class AchievementsBfaComponent implements OnInit, OnDestroy {

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

    this.achievementsSubscription = this.gameDataService.achievementsIdsBFASubject.subscribe((achievementIds) => {
      this.gameDataService.getAchievements(achievementIds).subscribe((achievements) => {
        this.achievements = achievements;
      });
    });
  }

  ngOnDestroy(): void {
    this.characterSubscription.unsubscribe();
    this.achievementsSubscription.unsubscribe();
  }
}
