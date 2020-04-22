import {Achievement} from './achievement';
import {CharacterAchievementCriteria} from './character-achievement-criteria';

export class CharacterAchievement {

  id: number;
  achievement: Achievement;
  completed_timestamp: number; // 1408482434000
  criteria: CharacterAchievementCriteria;

  constructor() {
    this.achievement = new Achievement();
    this.criteria = new CharacterAchievementCriteria();
  }
}
