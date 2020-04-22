export class AchievementMedia {

  id: number;
  assets: { key: string, value: string }[];

  constructor() {
    this.assets = [];
  }
}
