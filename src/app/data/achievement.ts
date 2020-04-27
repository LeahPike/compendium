import {AchievementCriteria} from './achievement-criteria';
import {AchievementMedia} from './achievement-media';
import {AchievementChildCriteria} from './achievement-child-criteria';

export class Achievement {

  id: number;
  name: string;
  description: string;
  criteria: AchievementCriteria;
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
    this.mediaObject = new AchievementMedia();
  }
}
