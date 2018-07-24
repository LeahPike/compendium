import {Injectable} from '@angular/core';
import {Race} from './race';
import {Class} from './class';
import {Character} from './character';
import {BattleNetService} from './battle-net.service';
import {forkJoin} from 'rxjs/observable/forkJoin';

@Injectable()
export class GameDataService {

  characters: Character[] = [];
  classes: Class[] = [];
  races: Race[] = [];

  constructor(private battleNetService: BattleNetService) {

    forkJoin(
      // load  base data
      this.battleNetService.getClasses(),
      this.battleNetService.getRaces()

    ).subscribe(([classes, races]) => {

      this.classes = classes;
      this.races = races;

      this.battleNetService.getCharacter('azjol-nerub', 'asumi').subscribe((result: Character) => this.characters.push(result));
      this.battleNetService.getCharacter('azjol-nerub', 'sameera').subscribe((result: Character) => this.characters.push(result));
      this.battleNetService.getCharacter('azjol-nerub', 'lexiss').subscribe((result: Character) => this.characters.push(result));
      this.battleNetService.getCharacter('azjol-nerub', 'livana').subscribe((result: Character) => this.characters.push(result));
      this.battleNetService.getCharacter('azjol-nerub', 'mayara').subscribe((result: Character) => this.characters.push(result));
      this.battleNetService.getCharacter('azjol-nerub', 'salus').subscribe((result: Character) => this.characters.push(result));
      this.battleNetService.getCharacter('azjol-nerub', 'sheeta').subscribe((result: Character) => this.characters.push(result));
      this.battleNetService.getCharacter('azjol-nerub', 'siasan').subscribe((result: Character) => this.characters.push(result));
      this.battleNetService.getCharacter('azjol-nerub', 'snowise').subscribe((result: Character) => this.characters.push(result));
      this.battleNetService.getCharacter('azjol-nerub', 'sunzie').subscribe((result: Character) => this.characters.push(result));
      this.battleNetService.getCharacter('azjol-nerub', 'talah').subscribe((result: Character) => this.characters.push(result));
      this.battleNetService.getCharacter('azjol-nerub', 'valiah').subscribe((result: Character) => this.characters.push(result));
      this.battleNetService.getCharacter('azjol-nerub', 'zirelle').subscribe((result: Character) => this.characters.push(result));
      this.battleNetService.getCharacter('khadgar', 'Zyrin').subscribe((result: Character) => this.characters.push(result));
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
