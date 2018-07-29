import {Component, Input, OnInit} from '@angular/core';
import {Character} from '../data/character';

@Component({
  selector: 'app-character-achievement',
  templateUrl: './character-achievement.component.html'
})
export class CharacterAchievementComponent implements OnInit {


  @Input()
  character: Character;

  @Input()
  achievementId: number;

  completed = false;

  ngOnInit() {

    for (const entry of this.character.achievements.achievementsCompleted) {
      if (entry === this.achievementId) {
        console.log(entry, this.achievementId)
        this.completed = true;
      }
    }

    console.log(this.character.name, this.character.achievements);
  }

}
