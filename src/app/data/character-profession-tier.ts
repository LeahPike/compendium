import {ProfessionTier} from './profession-tier';

export class CharacterProfessionTier {
  skill_points: number; // 175
  max_skill_points: number; // 175
  tier: ProfessionTier;
  // known_recipes

  constructor () {
    this.tier = new ProfessionTier();
  }
}
