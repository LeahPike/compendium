import {Component, Input, OnInit} from '@angular/core';
import {GameDataService} from '../../services/game-data.service';
import {Profession} from '../../data/profession';

@Component({
  selector: 'app-character-profession',
  templateUrl: './character-profession.component.html'
})
export class CharacterProfessionComponent implements OnInit{

  @Input()
  profession: Profession;

  progressPercentage: number;

  constructor(private gameDataService: GameDataService) {
  }

  ngOnInit() {
    this.progressPercentage = Math.round(100 / this.profession.max * this.profession.rank);
  }
}
