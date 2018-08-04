import {CharacterAchievements} from './character-achievements';
import {CharacterProfessions} from './character-professions';

export interface Character {

  lastModified: number; // 1532215626000
  name: string; // Mayara
  realm: string; // Azjol-Nerub
  battlegroup: string; // Cruelty / Crueldad
  class: number; // 11
  race: number; // 4
  gender: number; // 1
  level: number; // 110
  achievementPoints: number; // 19740
  thumbnail: string; // azjolnerub/182/135329718-avatar.jpg
  calcClass: string; // U
  faction: number; // 0
  totalHonorableKills: number; // 9267

  achievements: CharacterAchievements;
  professions: CharacterProfessions;

  // custom
  imageMain: string;
  imageInset: string;
  imageAvatar: string;
}
