import {CharacterAchievements} from './character-achievements';
import {CharacterProfessions} from './character-professions';

export interface Character {

  achievementPoints: number; // 19740
  achievements: CharacterAchievements;
  battlegroup: string; // Cruelty / Crueldad
  calcClass: string; // U
  class: number; // 11
  faction: number; // 0
  feed: any; // TODO
  gender: number; // 1
  lastModified: number; // 1532215626000
  level: number; // 110
  name: string; // Mayara
  professions: CharacterProfessions;
  quests: any; // TODO
  race: number; // 4
  realm: string; // Azjol-Nerub
  talents: any; // TODO
  thumbnail: string; // azjolnerub/182/135329718-avatar.jpg
  totalHonorableKills: number; // 9267

  // custom
  imageMain: string;
  imageInset: string;
  imageAvatar: string;
}
