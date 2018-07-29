import {Item} from './item';
import {AchievementCriteria} from './achievement-criteria';

export interface Achievement {
  id: number; // 7
  title: string; // "Level 20"
  points: number; // 10
  description: string; // "Reach level 20"
  rewardItems: Item[];
  icon: string; // "achievement_level_20"
  criteria: AchievementCriteria[];
  accountWide: boolean; // false
  factionId: number; // 2
}

export interface Achievements {
  achievements: Achievement[];
}
