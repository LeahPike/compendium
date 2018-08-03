import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CharacterAvatarComponent} from './character-avatar.component';
import {CharacterAchievementComponent} from './achievements/character-achievement.component';
import {CharacterAchievementsComponent} from './achievements/character-achievements.component';
import {CharacterCardsComponent} from './cards/character-cards.component';
import {CharacterCardComponent} from './cards/character-card.component';
import {CharacterProfessionComponent} from './professions/character-profession.component';
import {CharacterProfessionsComponent} from './professions/character-professions.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CharacterAvatarComponent,
    CharacterAchievementComponent,
    CharacterAchievementsComponent,
    CharacterCardComponent,
    CharacterCardsComponent,
    CharacterProfessionComponent,
    CharacterProfessionsComponent
  ],
  exports: []
})
export class CharacterModule {
}
