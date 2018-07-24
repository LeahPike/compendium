import {Component, OnInit} from '@angular/core';
import {BattleNetService} from './data/battle-net.service';
import {Character} from './data/character';
import {Class} from './data/class';
import {Race} from './data/race';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  characters: Character[] = [];
  classes: Class[] = [];
  races: Race[] = [];

  constructor(private battleNetService: BattleNetService) {

  }

  ngOnInit() {

    this.battleNetService.getClasses().subscribe((result) => this.classes = result);
    this.battleNetService.getRaces().subscribe((result) => this.races = result);

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
  }
}
