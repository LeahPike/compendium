import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CharacterAvatarDirective} from './character-avatar.directive';
import {CharacterCardComponent} from './character-card.component';
import {CharacterProfessionComponent} from './character-profession.component';
import {CharacterCardsComponent} from './character-cards.component';
import {CharacterAchievementsComponent} from './character-achievements.component';
import {CharacterProfessionsComponent} from './character-professions.component';
import {CharacterInsetComponent} from './character-inset.component';
import {CharacterAchievementComponent} from './character-achievement.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CharacterAvatarDirective,
    CharacterCardComponent,
    CharacterCardsComponent,
    CharacterAchievementsComponent,
    CharacterAchievementComponent,
    CharacterProfessionComponent,
    CharacterProfessionsComponent,
    CharacterInsetComponent
  ],
  exports: [
    CharacterCardsComponent,
    CharacterAchievementsComponent,
    CharacterProfessionsComponent
  ]
})
export class CharacterModule {
}
