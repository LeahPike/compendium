import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})

export class SettingsComponent implements OnInit {

  storage: { key: string, length: number }[] = [];

  ngOnInit() {
    this.readStorage();
  }

  readStorage() {
    for (let i = 0, len = localStorage.length; i < len; i++) {
      const key = localStorage.key(i);
      const value = localStorage[key];
      this.storage.push({key, length: value.length});
    }
    this.storage.sort((a, b) => (a.key > b.key) ? 1 : -1);
  }

  clearStorage() {
    localStorage.clear();
    this.storage = [];
  }

}
