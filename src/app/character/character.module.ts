import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CharacterCardsComponent} from './cards/character-cards.component';
import {CharacterCardComponent} from './cards/character-card.component';
import {CharacterProfessionComponent} from './professions/character-profession.component';
import {CharacterProfessionsComponent} from './professions/character-professions.component';
import {SharedModule} from '../shared/shared.module';
import {AvatarModule} from './avatar/avatar.module';
import {AchievementsModule} from './achievements/achievements.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AvatarModule,
    AchievementsModule
  ],
  declarations: [
    CharacterCardComponent,
    CharacterCardsComponent,
    CharacterProfessionComponent,
    CharacterProfessionsComponent
  ],
  exports: []
})
export class CharacterModule {
}
