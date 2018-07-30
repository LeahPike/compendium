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

    console.log(this.achievement);

    for (const criteria of this.achievement.criteria) {
      for (let index = 0; index < this.character.achievements.criteria.length; index++) {
        if (criteria.id === this.character.achievements.criteria[index]) {

          const criteriaId = this.character.achievements.criteria[index];
          const criteriaQuantity = this.character.achievements.criteriaQuantity[index];
          const criteriaCreated = this.character.achievements.criteriaCreated[index];
          const criteriaTimestamp = this.character.achievements.criteriaTimestamp[index];

          this.matchedCriteria.push({
            id: criteriaId,
            quantity: criteriaQuantity,
            created: criteriaCreated,
            timestamp: criteriaTimestamp,
            criteria: criteria
          });

          if (criteriaQuantity === criteria.max) {
            this.completed = true;
          }
        }
      }
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
