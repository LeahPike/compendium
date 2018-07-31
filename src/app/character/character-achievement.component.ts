import {Component, Input, OnInit} from '@angular/core';
import {Character} from '../data/character';
import {Achievement} from '../data/achievement';
import {AchievementCriteria} from '../data/achievement-criteria';

@Component({
  selector: 'app-character-achievement',
  templateUrl: './character-achievement.component.html'
})
export class CharacterAchievementComponent implements OnInit {


  @Input()
  character: Character;

  @Input()
  achievement: Achievement;

  completed = false;

  matchedCriteria: { id: number, quantity: number, created: number, timestamp: number, criteria: AchievementCriteria }[] = [];

  ngOnInit() {

    let matchedCriteria = 0;

    for (const criteria of this.achievement.criteria) {

      const match = {
        id: criteria.id,
        quantity: null,
        created: null,
        timestamp: null,
        criteria: criteria
      };

      this.matchedCriteria.push(match);

      for (let index = 0; index < this.character.achievements.criteria.length; index++) {

        if (criteria.id === this.character.achievements.criteria[index]) {

          match.quantity = this.character.achievements.criteriaQuantity[index];
          match.created = this.character.achievements.criteriaCreated[index];
          match.timestamp = this.character.achievements.criteriaTimestamp[index];

          if (match.quantity === criteria.max) {
            matchedCriteria += 1;
          }
        }
      }
    }

    if (matchedCriteria === this.achievement.criteria.length) {
      this.completed = true;
    }

    //   for (const entry of this.character.achievements.criteria) {
    //
    //
    //   if (this.achievement.criteria.find((e) => e.id === entry)) {
    //
    //     console.log(this.character.name, this.achievement.title, this.achievement.criteria, entry);
    //     this.completed = true;
    //   }
    // }

    for (const entry of this.character.achievements.achievementsCompleted) {
      if (entry === this.achievement.id) {
        // this.completed = true;
        // console.log(this.achievementId, this.character.name, this.character.achievements.criteria);
      }
    }
  }
}
