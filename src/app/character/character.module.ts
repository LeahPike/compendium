import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CharacterCardComponent} from './character-card.component';
import {CharacterProfessionComponent} from './character-profession.component';
import {CharacterCardsComponent} from './character-cards.component';
import {CharacterAchievementsComponent} from './character-achievements.component';
import {CharacterProfessionsComponent} from './character-professions.component';
import {CharacterAvatarComponent} from './character-avatar.component';
import {CharacterAchievementComponent} from './character-achievement.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CharacterCardComponent,
    CharacterCardsComponent,
    CharacterAchievementsComponent,
    CharacterAchievementComponent,
    CharacterProfessionComponent,
    CharacterProfessionsComponent,
    CharacterAvatarComponent
  ],
  exports: [
    CharacterCardsComponent,
    CharacterAchievementsComponent,
    CharacterProfessionsComponent
  ]
})
export class CharacterModule {
}
