import {Profession} from './profession';
import {CharacterProfessionTier} from './character-profession-tier';

export class CharacterProfession {
  profession: Profession;
  tiers: CharacterProfessionTier[];
  skill_points: number; // Archaeology only, the others user tiers
  max_skill_points: number; // Archaeology only, the others user tiers

  constructor () {
    this.profession = new Profession();
    this.tiers = [];
  }
}
