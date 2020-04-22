import {Injectable} from '@angular/core';
import {Character} from '../data/character';
import {BattleNetService} from './battle-net.service';
import {Achievement} from '../data/achievement';

import 'rxjs/add/observable/forkJoin';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GameDataService {

  achievementsLegion: Achievement[] = [];
  achievementsBFA: Achievement[] = [];
  characters: Character[] = [];

  constructor(private battleNetService: BattleNetService) {

    this.battleNetService.getToken().subscribe((token) => {

      this.loadCharacters();
      this.loadAchievementsLegion();
      this.loadAchievementsBFA();

    });
  }

  loadCharacters() {

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

    for (const character of myCharacters) {
      // observableBatch.push(this.battleNetService.getCharacter(character));
      this.loadCharacter(character);
    }
  }

  loadCharacter(value) {
    this.battleNetService.getCharacter(value).subscribe((character: Character) => {
      this.characters.push(character);
      this.characters.sort((a, b) => a.level < b.level ? 1 : a.level > b.level ? -1 : 0);
    });
  }

  loadAchievementsBFA() {

    const achievements = [];
    achievements.push(12544); // Level 120
    achievements.push(12582); // Come Sail Away
    achievements.push(12918); // Have a Heart

    const observableBatch = [];
    for (const achievementId of achievements) {
      observableBatch.push(this.battleNetService.getAchievement(achievementId));
    }
    Observable.forkJoin(observableBatch).subscribe((result: Achievement[]) => {
      for (const achievement of result) {
        this.achievementsBFA.push(achievement);
      }
    });
  }

  loadAchievementsLegion() {

    const achievements = [];
    achievements.push(10671); // Level 110
    achievements.push(11171); // Arsenal of Power
    achievements.push(10461); // Fighting with Style: Classic
    achievements.push(10994); // A Glorious Campaign
    achievements.push(11223); // Legendary Research
    achievements.push(10459); // Improving on History
    achievements.push(11298); // A Classy Outfit
    achievements.push(11546); // Breaching the Tomb

    const observableBatch = [];
    for (const achievement of achievements) {
      observableBatch.push(this.battleNetService.getAchievement(achievement));
    }
    Observable.forkJoin(observableBatch).subscribe((result: Achievement[]) => {
      for (const achievement of result) {
        this.achievementsLegion.push(achievement);
      }
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
