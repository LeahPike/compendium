import {AchievementCriteria} from './achievement-criteria';
import {AchievementMedia} from './achievement-media';

export class Achievement {

  id: number;
  name: string;
  description: string;
  criteria: AchievementCriteria;
  child_criteria: AchievementCriteria[];
  points: number;
  display_order: number;
  is_account_wide: boolean;
  // category
  media: { id: number, key: { href: string } };

  // custom
  mediaObject: AchievementMedia;
  icon: string;

  constructor() {
    this.criteria = new AchievementCriteria();
    this.child_criteria = [];
    this.mediaObject = new AchievementMedia();
  }
}
