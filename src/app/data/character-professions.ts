import {CharacterProfession} from './character-profession';

export class CharacterProfessions {
  primaries: CharacterProfession[];
  secondaries: CharacterProfession[];

  constructor() {
    this.primaries = [];
    this.secondaries = [];
  }
}

