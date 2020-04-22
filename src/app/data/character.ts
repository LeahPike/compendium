import {CharacterGender} from './character-gender';
import {Faction} from './faction';
import {CharacterRace} from './character-race';
import {CharacterClass} from './character-class';
import {CharacterSpec} from './character-spec';
import {Realm} from './realm';
import {Guild} from './guild';
import {CharacterTitle} from './character-title';
import {CharacterMedia} from './character-media';
import {CharacterProfessions} from './character-professions';
import {CharacterAchievements} from './character-achievements';

export class Character {

  id: number; // 135329718;
  name: string; // Mayara
  gender: CharacterGender;
  faction: Faction;
  race: CharacterRace;
  character_class: CharacterClass;
  active_spec: CharacterSpec;
  realm: Realm;
  guild: Guild;
  level: number; // 120
  experience: number; // 0
  achievement_points: number; // 19965
  achievements: { href: string };
  titles: { href: string };
  pvp_summary: { href: string };
  encounters: { href: string };
  media: { href: string };
  last_login_timestamp: number; // 1587335897000
  average_item_level: number; // 435
  equipped_item_level: number; // 425;
  specializations: { href: string };
  statistics: { href: string };
  mythic_keystone_profile: { href: string };
  equipment: { href: string };
  appearance: { href: string };
  collections: { href: string };
  active_title: CharacterTitle;
  reputations: { href: string };
  quests: { href: string };
  achievements_statistics: { href: string };
  professions: { href: string };

  // custom
  mediaObject: CharacterMedia;
  professionsObject: CharacterProfessions;
  achievementsObject: CharacterAchievements;

  constructor() {
    this.faction = new Faction();
    this.active_spec = new CharacterSpec();
    this.race = new CharacterRace();
    this.character_class = new CharacterClass();
    this.mediaObject = new CharacterMedia();
    this.professionsObject = new CharacterProfessions();
    this.achievementsObject = new CharacterAchievements();
  }
}


