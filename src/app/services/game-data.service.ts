import {Injectable} from '@angular/core';
import {Race} from '../data/race';
import {Class} from '../data/class';
import {Character} from '../data/character';
import {BattleNetService} from './battle-net.service';
import {Achievement} from '../data/achievement';

import 'rxjs/add/observable/forkJoin';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GameDataService {

  characters: Character[] = [];
  classes: Class[] = [];
  races: Race[] = [];
  achievements: Achievement[];

  constructor(private battleNetService: BattleNetService) {

    console.log('GameDataService', 'constructor');

    Observable.forkJoin(
      // load  base data
      this.battleNetService.getClasses(),
      this.battleNetService.getRaces()
    ).subscribe(([classes, races]) => {

      this.classes = classes;
      this.races = races;
      // this.achievements = achievements;

      const myCharacters = [];
      myCharacters.push('azjol-nerub/asumi');
      myCharacters.push('azjol-nerub/lexiss');
      myCharacters.push('azjol-nerub/livana');
      myCharacters.push('azjol-nerub/mayara');
      myCharacters.push('azjol-nerub/salus');
      myCharacters.push('azjol-nerub/sheeta');
      myCharacters.push('azjol-nerub/siasan');
      myCharacters.push('azjol-nerub/snowise');
      myCharacters.push('azjol-nerub/sunzie');
      myCharacters.push('azjol-nerub/talah');
      myCharacters.push('azjol-nerub/valiah');
      myCharacters.push('azjol-nerub/zirelle');

      // myCharacters.push ('azjol-nerub/sameera');
      // myCharacters.push ('khadgar/Zyrin');

      const observableBatch = [];
      for (const character of myCharacters) {
        observableBatch.push(this.battleNetService.getCharacter(character));
      }
      Observable.forkJoin(observableBatch).subscribe((result: Character[]) => {

        for (const entry of result) {
          this.characters.push(entry);
        }
        // sort characters by achievement points
        this.characters
          .sort((a, b) => a.achievementPoints < b.achievementPoints ? 1 : a.achievementPoints > b.achievementPoints ? -1 : 0);
      });

    });
  }

  findClass(id: number): Class {
    for (const entry of this.classes) {
      if (id === entry.id) {
        return entry;
      }
    }
  }

  findRace(id: number): Race {
    for (const entry of this.races) {
      if (id === entry.id) {
        return entry;
      }
    }
  }

  getClassColour(classNumber: number) {
    switch (classNumber) {
      case 6: // Death Knight
        return '#C41F3B';
      case 11: // Druid
        return '#FF7D0A';
      case 3: // Hunter
        return '#ABD473';
      case 8: // Mage
        return '#69CCF0';
      case 10: // Monk
        return '#00FF96';
      case 2: // Paladin
        return '#F58CBA';
      case 5: // Priest
        return '#FFFFFF';
      case 4: // Rogue
        return '#FFF569';
      case 7: // Shaman
        return '#0070DE';
      case 9: // Warlock
        return '#9482C9';
      case 1: // Warrior
        return '#C79C6E';
    }
  }
}
