import {Component, Input, OnInit} from '@angular/core';
import {Character} from '../../data/character';
import {Achievement} from '../../data/achievement';

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

  // criteria: { id: number, quantity: number, created: number, timestamp: number, criteria: CharacterAchievementCriteria }[] = [];

  ngOnInit() {

    // if the character has the achievement in it's achievementsCompleted collection mark it as completed
    this.completed = this.character.achievementsObject.achievements.find((a) => a.id === this.achievement.id) != null;

    // // if there is only one criteria, then we don't need to list the criteria
    // if (this.achievement.criteria.length > 0) {
    //
    //   // loop through the criteria for the achievement
    //   for (const criteria of this.achievement.criteria) {
    //
    //     // we cannot hope to match criteria without an id, so ignore it
    //     if (criteria.id !== 0 && criteria.description !== '') {
    //
    //       const match = {
    //         id: criteria.id,
    //         quantity: null,
    //         created: null,
    //         timestamp: null,
    //         criteria: criteria
    //       };
    //
    //       this.criteria.push(match);
    //
    //       for (let index = 0; index < this.character.achievements.criteria.length; index++) {
    //
    //         if (criteria.id === this.character.achievements.criteria[index]) {
    //           match.quantity = this.character.achievements.criteriaQuantity[index];
    //           match.created = this.character.achievements.criteriaCreated[index];
    //           match.timestamp = this.character.achievements.criteriaTimestamp[index];
    //         }
    //
    //       }
    //     }
    //   }
    // }
  }
}
