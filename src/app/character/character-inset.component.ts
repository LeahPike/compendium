import {Component, Input, OnInit} from '@angular/core';
import {Character} from '../data/character';

@Component({
  selector: 'app-character-insert',
  templateUrl: './character-inset.component.html'
})
export class CharacterInsetComponent implements OnInit {

  @Input()
  character: Character;

  constructor() {
  }

  ngOnInit() {

  }

}
