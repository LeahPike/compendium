import {AchievementChildCriteria} from './achievement-child-criteria';

export class AchievementCriteria {

  amount: number;
  description: string;
  id: number;
  child_criteria: AchievementChildCriteria[];

  constructor() {
    this.child_criteria = [];
  }
}
