import {CharacterAchievementChildCriteria} from './character-achievement-child-criteria';

export class CharacterAchievementCriteria {

  id: number;
  is_completed: boolean;
  child_criteria: CharacterAchievementChildCriteria[];

  constructor() {
    this.child_criteria = [];
  }
}
