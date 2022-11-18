import { Injectable } from '@angular/core';
import { Character } from '../data/character';
import { BattleNetService } from './battle-net.service';
import { Achievement } from '../data/achievement';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';

@Injectable()
export class GameDataService {

  characterSubject: BehaviorSubject<Character[]> = new BehaviorSubject<Character[]>([]);
  achievementsIdsLegionSubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  achievementsIdsBFASubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  achievementsIdsShadowlandsSubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

  private achievementIds: number[] = []; // A list of achievement id's we store data for

  public static getClassColour(className: string): string {
    switch (className) {
      case 'Death Knight':
        return '#C41F3B';
      case 'Demon Hunter':
        return '#A330C9';
      case 'Druid':
        return '#FF7D0A';
      case 'Evoker':
        return '#33937F';
      case 'Hunter':
        return '#ABD473';
      case 'Mage':
        return '#69CCF0';
      case 'Monk':
        return '#00FF96';
      case 'Paladin':
        return '#F58CBA';
      case 'Priest':
        return '#FFFFFF';
      case 'Rogue':
        return '#FFF569';
      case 'Shaman':
        return '#0070DE';
      case 'Warlock':
        return '#9482C9';
      case 'Warrior':
        return '#C79C6E';
    }
    return '';
  }

  static sortCharacters(characters: Character[]): void {
    characters.sort((a, b) => {
      if (a.level < b.level) {
        return 1;
      } else if (a.level > b.level) {
        return -1;
      } else {
        if (a.achievement_points < b.achievement_points) {
          return 1;
        } else if (a.achievement_points > b.achievement_points) {
          return -1;
        } else {
          return 0;
        }
      }
    });
  }

  constructor(private battleNetService: BattleNetService) {

    this.achievementIds = [];
    this.addAchievementsLegion();
    this.addAchievementsBFA();
    this.addAchievementsShadowlands();
    this.refreshData().subscribe();
  }

  public refreshData(): Observable<void> {
    return new Observable<void>((observer) => {
      console.log('Refreshing data...');
      this.battleNetService.getToken().subscribe(() => {
        this.loadCharacters().subscribe(() => {
          console.log('Refreshing data complete!');
          observer.next();
          observer.complete();
        });
      });
    });
  }

  public getAchievements(achievementIds: number[]): Observable<Achievement[]> {

    return new Observable<Achievement[]>((observer) => {
      const observableBatch = [];
      for (const achievementId of achievementIds) {
        observableBatch.push(this.battleNetService.getAchievement(achievementId));
      }
      const achievements: Achievement[] = [];
      forkJoin(observableBatch).subscribe((result: Achievement[]) => {
        for (const achievement of result) {
          achievements.push(achievement);
        }
        observer.next(achievements);
        observer.complete();
      });
    });
  }

  private addAchievementsLegion(): void {

    const achievementIds: number[] = [];
    achievementIds.push(10671); // Level 110
    achievementIds.push(11171); // Arsenal of Power
    achievementIds.push(10461); // Fighting with Style: Classic
    achievementIds.push(10994); // A Glorious Campaign
    achievementIds.push(11223); // Legendary Research
    achievementIds.push(10459); // Improving on History
    achievementIds.push(11298); // A Classy Outfit
    achievementIds.push(11546); // Breaching the Tomb

    this.achievementsIdsLegionSubject.next(achievementIds);

    this.achievementIds = this.achievementIds.concat(achievementIds);
  }

  private addAchievementsBFA(): void {

    const achievementIds: number[] = [];
    achievementIds.push(12544); // Level 120
    achievementIds.push(12510); // Ready for War ( Alliance )
    achievementIds.push(12741); // Giving a Scrap
    achievementIds.push(12582); // Come Sail Away
    achievementIds.push(12918); // Have a Heart

    this.achievementsIdsBFASubject.next(achievementIds);

    this.achievementIds = this.achievementIds.concat(achievementIds);
  }

  private addAchievementsShadowlands(): void {

    const achievementIds: number[] = [];
    achievementIds.push(14334); // Into the Maw
    achievementIds.push(14281); // The Path to Ascension
    achievementIds.push(14206); // Blade of the Primus
    achievementIds.push(14164); // Awaken, Ardenweald
    achievementIds.push(13878); // The Master of Revendreth

    achievementIds.push(14783); // Level 60

    achievementIds.push(14627); // Choosing Your Purpose
    achievementIds.push(14834); // Bound with Purpose
    achievementIds.push(14835); // A Resolute Bond
    achievementIds.push(14836); // Unwavering Bond
    achievementIds.push(14837); // Nexus of Bonds

    achievementIds.push(14628); // The Road to Renown
    achievementIds.push(14629); // Gaining Respect
    achievementIds.push(14630); // Becoming a Hero
    achievementIds.push(14631); // Champion of the Covenant

    this.achievementsIdsShadowlandsSubject.next(achievementIds);

    this.achievementIds = this.achievementIds.concat(achievementIds);
  }

  private loadCharacters(): Observable<void> {
    return new Observable<void>((observer) => {
      const myCharacters = [];
      myCharacters.push('azjolnerub/asumi');
      myCharacters.push('azjolnerub/lexiss');
      myCharacters.push('azjolnerub/livana');
      myCharacters.push('azjolnerub/mayara');
      myCharacters.push('azjolnerub/salus');
      myCharacters.push('azjolnerub/sheeta');
      myCharacters.push('azjolnerub/siasan');
      myCharacters.push('azjolnerub/snowise');
      myCharacters.push('azjolnerub/sunzie');
      myCharacters.push('azjolnerub/talah');
      myCharacters.push('azjolnerub/valiah');
      myCharacters.push('azjolnerub/xienith');
      myCharacters.push('azjolnerub/zirelle');

      // myCharacters.push('khadgar/kirah');
      // myCharacters.push('khadgar/Zyrin');

      // myCharacters.push('azjolnerub/sameera');

      const observableBatch = [];

      for (const value of myCharacters) {
        observableBatch.push(this.battleNetService.getCharacter(value, this.achievementIds));
      }

      forkJoin(observableBatch).subscribe((characters: Character[]) => {
        GameDataService.sortCharacters(characters);
        this.characterSubject.next(characters);
        observer.next();
        observer.complete();
      });
    });
  }
}
