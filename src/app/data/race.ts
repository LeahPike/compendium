import {Class} from './class';

export interface Race {
  id: number; // 1
  mask: number; // 1
  side: string; // alliance
  name: string; // Human
}

export interface Races {
  races: Race[];
}
