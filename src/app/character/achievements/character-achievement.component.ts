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
  completedTimestamp: Date;

  ngOnInit(): void {

    const characterAchievement = this.character.achievementsObject.achievements.find((a) => a.id === this.achievement.id);

    if (characterAchievement != null) {
      this.characterAchievement = characterAchievement;

      this.completed = this.characterAchievement.criteria.is_completed;
      if (this.completed) {
        this.completedTimestamp = new Date(this.characterAchievement.completed_timestamp);
      }

      if (this.achievement.criteria && this.achievement.criteria.child_criteria) {
        for (const childCriteria of this.achievement.criteria.child_criteria) {
          const characterChildCriteria = this.characterAchievement.criteria.child_criteria.find((a) => a.id === childCriteria.id);
          if (characterChildCriteria != null) {
            this.childCriteria.push({characterChildCriteria, childCriteria});
          }
        }
      }
    }
  }
}
