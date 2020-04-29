import {Component, Input, OnInit} from '@angular/core';
import {Character} from '../../data/character';
import {Achievement} from '../../data/achievement';
import {CharacterAchievement} from '../../data/character-achievement';
import {CharacterAchievementChildCriteria} from '../../data/character-achievement-child-criteria';
import {AchievementChildCriteria} from '../../data/achievement-child-criteria';

@Component({
  selector: 'app-character-achievement',
  templateUrl: './character-achievement.component.html'
})
export class CharacterAchievementComponent implements OnInit {

  @Input()
  character: Character;

  @Input()
  achievement: Achievement;

  characterAchievement: CharacterAchievement;
  childCriteria: { characterChildCriteria: CharacterAchievementChildCriteria, childCriteria: AchievementChildCriteria }[] = [];

  completed = false;
  completed_timestamp: Date;

  ngOnInit() {

    this.characterAchievement = this.character.achievementsObject.achievements.find((a) => a.id === this.achievement.id);

    if (this.characterAchievement) {
      this.completed = this.characterAchievement.criteria.is_completed;
      if (this.completed === true) {
        this.completed_timestamp = new Date(this.characterAchievement.completed_timestamp);
      }
    }

    if (this.achievement.criteria.child_criteria) {
      for (const childCriteria of this.achievement.criteria.child_criteria) {
        let characterChildCriteria: CharacterAchievementChildCriteria;
        if (this.characterAchievement) {
          characterChildCriteria = this.characterAchievement.criteria.child_criteria.find((a) => a.id === childCriteria.id);
        }
        this.childCriteria.push({characterChildCriteria, childCriteria});
      }
    }

//    console.log('childCriteria', this.childCriteria);

    // if the character has the achievement in it's achievementsCompleted collection mark it as completed


    // if (this.achievement.criteria.operator) {
    //   console.log(this.character.name, this.achievement, characterAchievement);
    // }

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
