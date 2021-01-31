import {Component, OnInit} from '@angular/core';
import {GameDataService} from '../../services/game-data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})

export class SettingsComponent implements OnInit {

  storageCharacters: { key: string, length: number }[] = [];
  storageAchievements: { key: string, length: number }[] = [];

  constructor(private gameDataService: GameDataService) {
  }

  ngOnInit(): void {
    this.readStorage();
  }

  readStorage(): void {
    this.storageAchievements = [];
    this.storageCharacters = [];
    for (let i = 0, len = localStorage.length; i < len; i++) {
      const key = localStorage.key(i);
      if (key != null) {
        const value = localStorage[key];
        if (key.startsWith('achievement')) {
          this.storageAchievements.push({key, length: value.length});
        } else {
          this.storageCharacters.push({key, length: value.length});
        }
      }
    }
    this.storageAchievements.sort((a, b) => (a.key > b.key) ? 1 : -1);
    this.storageCharacters.sort((a, b) => (a.key > b.key) ? 1 : -1);
  }

  reloadAll(): void {
    localStorage.clear();
    this.gameDataService.refreshData().subscribe(() => this.readStorage());
  }

  reloadCharacter(key: string): void {
    localStorage.removeItem(key);
    this.gameDataService.refreshData().subscribe(() => this.readStorage());
  }
}
