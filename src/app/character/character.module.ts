import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CharacterAvatarComponent} from './character-avatar.component';
import {CharacterAchievementComponent} from './achievements/character-achievement.component';
import {CharacterCardsComponent} from './cards/character-cards.component';
import {CharacterCardComponent} from './cards/character-card.component';
import {CharacterProfessionComponent} from './professions/character-profession.component';
import {CharacterProfessionsComponent} from './professions/character-professions.component';
import {CharacterAchievementsLegionComponent} from './achievements/character-achievements-legion.component';
import {CharacterAchievementsBFAComponent} from './achievements/character-achievements-bfa.component';
import {SharedModule} from '../shared/shared.module';
import {TooltipModule} from 'ngx-bootstrap/tooltip';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TooltipModule.forRoot()
  ],
  declarations: [
    CharacterAvatarComponent,
    CharacterAchievementsLegionComponent,
    CharacterAchievementsBFAComponent,
    CharacterAchievementComponent,
    CharacterCardComponent,
    CharacterCardsComponent,
    CharacterProfessionComponent,
    CharacterProfessionsComponent
  ],
  exports: []
})
export class CharacterModule {
}
