import {Injectable, OnInit} from '@angular/core';
import {Character} from '../data/character';
import {BattleNetService} from './battle-net.service';
import {Achievement} from '../data/achievement';

import 'rxjs/add/observable/forkJoin';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class GameDataService implements OnInit {

  characterSubject: BehaviorSubject<Character[]> = new BehaviorSubject<Character[]>([]);
  achievementsIdsLegionSubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  achievementsIdsBFASubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

  private achievementIds: number[] = []; // A list of achievement id's we store data for

  constructor(private battleNetService: BattleNetService) {
    this.battleNetService.getToken().subscribe((token) => {
      this.addAchievementsLegion();
      this.addAchievementsBFA();
      this.loadCharacters();
    });
  }

  ngOnInit() {
  }

  private addAchievementsLegion() {

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

  private addAchievementsBFA() {

    const achievementIds: number[] = [];
    achievementIds.push(12544); // Level 120
    achievementIds.push(12510); // Ready for War ( Alliance )
    achievementIds.push(12582); // Come Sail Away
    achievementIds.push(12918); // Have a Heart

    this.achievementsIdsBFASubject.next(achievementIds);

    this.achievementIds = this.achievementIds.concat(achievementIds);
  }

  private loadCharacters() {

    const myCharacters = [];
    myCharacters.push('azjolnerub/asumi');
    myCharacters.push('azjolnerub/lexiss');
    myCharacters.push('azjolnerub/livana');
    myCharacters.push('azjolnerub/mayara');
    // myCharacters.push('azjolnerub/sameera');
    myCharacters.push('azjolnerub/salus');
    myCharacters.push('azjolnerub/sheeta');
    myCharacters.push('azjolnerub/siasan');
    myCharacters.push('azjolnerub/snowise');
    myCharacters.push('azjolnerub/sunzie');
    myCharacters.push('azjolnerub/talah');
    myCharacters.push('azjolnerub/valiah');
    myCharacters.push('azjolnerub/zirelle');

    // myCharacters.push('khadgar/kirah');
    // myCharacters.push('khadgar/Zyrin');

    const observableBatch = [];

    for (const value of myCharacters) {
      observableBatch.push(this.battleNetService.getCharacter(value, this.achievementIds));
    }

    Observable.forkJoin(observableBatch).subscribe((characters: Character[]) => {
      characters.sort((a, b) => a.level < b.level ? 1 : a.level > b.level ? -1 : 0);
      this.characterSubject.next(characters);
    });
  }

  getAchievements(achievementIds: number[]): Observable<Achievement[]> {

    return new Observable<Achievement[]>((observer) => {
      const observableBatch = [];
      for (const achievementId of achievementIds) {
        observableBatch.push(this.battleNetService.getAchievement(achievementId));
      }
      const achievements: Achievement[] = [];
      Observable.forkJoin(observableBatch).subscribe((result: Achievement[]) => {
        for (const achievement of result) {
          achievements.push(achievement);
        }
        observer.next(achievements);
        observer.complete();
      });
    });
  }

  getClassColour(className: string) {
    switch (className) {
      case 'Death Knight':
        return '#C41F3B';
      case 'Demon Hunter':
        return '#A330C9';
      case 'Druid':
        return '#FF7D0A';
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
  }

}
