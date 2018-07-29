import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CharacterAvatarDirective} from './character-avatar.directive';
import {CharacterCardComponent} from './character-card.component';
import {CharacterProfessionComponent} from './character-profession.component';
import {CharacterCardsComponent} from './character-cards.component';
import {CharacterAchievementsComponent} from './character-achievements.component';
import {CharacterProfessionsComponent} from './character-professions.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CharacterAvatarDirective,
    CharacterCardComponent,
    CharacterCardsComponent,
    CharacterAchievementsComponent,
    CharacterProfessionComponent,
    CharacterProfessionsComponent
  ],
  exports: [
    CharacterCardsComponent,
    CharacterAchievementsComponent,
    CharacterProfessionsComponent
  ]
})
export class CharacterModule {
}
